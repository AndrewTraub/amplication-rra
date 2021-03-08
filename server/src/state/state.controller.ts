import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { StateService } from "./state.service";
import { StateControllerBase } from "./base/state.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("states")
@common.Controller("states")
export class StateController extends StateControllerBase {
  constructor(
    protected readonly service: StateService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
