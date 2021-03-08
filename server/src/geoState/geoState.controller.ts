import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { GeoStateService } from "./geoState.service";
import { GeoStateControllerBase } from "./base/geoState.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("geo-states")
@common.Controller("geo-states")
export class GeoStateController extends GeoStateControllerBase {
  constructor(
    protected readonly service: GeoStateService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
