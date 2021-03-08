import { Module } from "@nestjs/common";
import { GeoStateModuleBase } from "./base/geoState.module.base";
import { GeoStateService } from "./geoState.service";
import { GeoStateController } from "./geoState.controller";
import { GeoStateResolver } from "./geoState.resolver";

@Module({
  imports: [GeoStateModuleBase],
  controllers: [GeoStateController],
  providers: [GeoStateService, GeoStateResolver],
  exports: [GeoStateService],
})
export class GeoStateModule {}
