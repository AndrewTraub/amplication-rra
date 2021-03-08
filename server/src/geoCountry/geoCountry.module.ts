import { Module } from "@nestjs/common";
import { GeoCountryModuleBase } from "./base/geoCountry.module.base";
import { GeoCountryService } from "./geoCountry.service";
import { GeoCountryController } from "./geoCountry.controller";
import { GeoCountryResolver } from "./geoCountry.resolver";

@Module({
  imports: [GeoCountryModuleBase],
  controllers: [GeoCountryController],
  providers: [GeoCountryService, GeoCountryResolver],
  exports: [GeoCountryService],
})
export class GeoCountryModule {}
