import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { GeoCityService } from "./geoCity.service";
import { GeoCityControllerBase } from "./base/geoCity.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("geo-cities")
@common.Controller("geo-cities")
export class GeoCityController extends GeoCityControllerBase {
  constructor(
    protected readonly service: GeoCityService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
