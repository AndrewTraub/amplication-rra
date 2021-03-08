import { Module } from "@nestjs/common";
import { GeoCityModuleBase } from "./base/geoCity.module.base";
import { GeoCityService } from "./geoCity.service";
import { GeoCityController } from "./geoCity.controller";
import { GeoCityResolver } from "./geoCity.resolver";

@Module({
  imports: [GeoCityModuleBase],
  controllers: [GeoCityController],
  providers: [GeoCityService, GeoCityResolver],
  exports: [GeoCityService],
})
export class GeoCityModule {}
