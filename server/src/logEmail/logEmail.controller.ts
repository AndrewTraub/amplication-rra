import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { LogEmailService } from "./logEmail.service";
import { LogEmailControllerBase } from "./base/logEmail.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("log-emails")
@common.Controller("log-emails")
export class LogEmailController extends LogEmailControllerBase {
  constructor(
    protected readonly service: LogEmailService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
