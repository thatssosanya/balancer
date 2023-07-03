import { Module } from "@nestjs/common"
import { AssetsController } from "./assets.controller"
import { AssetsService } from "./assets.service"
import { PrismaService } from "./prisma.service"

@Module({
  imports: [],
  controllers: [AssetsController],
  providers: [AssetsService, PrismaService],
})
export class AssetsModule { }
