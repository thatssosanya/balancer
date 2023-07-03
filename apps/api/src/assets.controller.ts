import { Controller, Get, Query } from "@nestjs/common";
import { AssetsService } from "./assets.service";

@Controller()
export class AssetsController {
  constructor(private readonly appService: AssetsService) { }

  @Get("assets")
  assets(@Query('symbols') symbols: string) {
    const symbolsArray = symbols?.split(',') || [];
    return this.appService.assets(symbolsArray);
  }
}
