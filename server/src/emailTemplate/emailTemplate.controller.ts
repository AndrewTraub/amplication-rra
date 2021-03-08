import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { EmailTemplateService } from "./emailTemplate.service";
import { EmailTemplateControllerBase } from "./base/emailTemplate.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("email-templates")
@common.Controller("email-templates")
export class EmailTemplateController extends EmailTemplateControllerBase {
  constructor(
    protected readonly service: EmailTemplateService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
