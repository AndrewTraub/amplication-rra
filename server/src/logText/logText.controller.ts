import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { LogTextService } from "./logText.service";
import { LogTextControllerBase } from "./base/logText.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("log-texts")
@common.Controller("log-texts")
export class LogTextController extends LogTextControllerBase {
  constructor(
    protected readonly service: LogTextService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
