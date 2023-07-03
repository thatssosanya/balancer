import { Module } from "@nestjs/common"
import { AssetsModule } from "./assets.module"
import { CronModule } from "./cron.module"

@Module({
  imports: [AssetsModule, CronModule],
})
export class AppModule { }
