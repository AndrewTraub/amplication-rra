import { Module } from "@nestjs/common";
import { AffiliateStatModuleBase } from "./base/affiliateStat.module.base";
import { AffiliateStatService } from "./affiliateStat.service";
import { AffiliateStatController } from "./affiliateStat.controller";
import { AffiliateStatResolver } from "./affiliateStat.resolver";

@Module({
  imports: [AffiliateStatModuleBase],
  controllers: [AffiliateStatController],
  providers: [AffiliateStatService, AffiliateStatResolver],
  exports: [AffiliateStatService],
})
export class AffiliateStatModule {}
