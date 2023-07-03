import { Module } from "@nestjs/common"
import { ScheduleModule } from "@nestjs/schedule"
import { CronService } from "./cron.service"
import { PrismaService } from "./prisma.service"

@Module({
  imports: [
    ScheduleModule.forRoot()
  ],
  providers: [CronService, PrismaService],
})
export class CronModule { }
