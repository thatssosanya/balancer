import { Injectable } from "@nestjs/common"
import { PrismaService } from "./prisma.service"

@Injectable()
export class AssetsService {
  constructor(private prisma: PrismaService) { }
  assets(symbols: string[]) {
    return this.prisma.assetSnapshot.findMany({
      ...(
        symbols.length ? {
          where: {
            symbol: { in: symbols }
          }
        } : { }
      ),
      distinct: ["symbol"],
      orderBy: {
        datetime: "desc",
      },
    })
  }
}
