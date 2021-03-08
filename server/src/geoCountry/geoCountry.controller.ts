import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { GeoCountryService } from "./geoCountry.service";
import { GeoCountryControllerBase } from "./base/geoCountry.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("geo-countries")
@common.Controller("geo-countries")
export class GeoCountryController extends GeoCountryControllerBase {
  constructor(
    protected readonly service: GeoCountryService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
