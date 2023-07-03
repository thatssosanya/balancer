import { Injectable, Logger } from "@nestjs/common"
import { Cron } from "@nestjs/schedule"
import { PrismaService } from "./prisma.service"

@Injectable()
export class CronService {
  private coins = []
  private logger = new Logger(CronService.name)
  constructor(private prisma: PrismaService) {
    fetch("https://api.coingecko.com/api/v3/coins/list")
      .then(r => r.json())
      .then((coins: Coin[]) => {
        this.coins = coins
        this.logger.log(`${ coins.length } coins found.`)
      })
  }

  @Cron("0 */15 * * * *")
  async collectMarketCap() {
    if (!this.coins.length) {
      this.logger.warn("Can't collect data - no coins found.")
      return
    }
    this.logger.log(`Collecting data for ${ this.coins.length } coins.`)
    const date = new Date()
    const baseUrl = "https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&include_market_cap=true&ids="
    for (let i = 0, j = 1; j < this.coins.length; j++) {
      const url = baseUrl + this.coins.slice(i, j).map(c => c.id).join(",")
      if (url.length < 1300) {
        continue
      }
      const response: Record<string, AssetData> = await fetch(url).then(r => r.json())
      const assetSnapshots = Object.entries(response)
        .filter(([_, data]) => data.usd && data.usd_market_cap)
        .map(([assetId, data]) => {
          return {
            symbol: (this.coins.find(c => c.id === assetId) as Coin).symbol,
            datetime: date,
            vsUsd: data.usd,
            marketCap: data.usd_market_cap,
          }
        })
      await Promise.all([
        this.prisma.$transaction(assetSnapshots.map(data =>
          this.prisma.assetSnapshot.create({ data })
        )),
        new Promise(resolve => setTimeout(resolve, 10 * 1000))
      ])
      i = j
    }
  }
}

interface Coin {
  id: string
  symbol: string
  name: string
}

interface AssetData {
  usd: number
  usd_market_cap: number
}
