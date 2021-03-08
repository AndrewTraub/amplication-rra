import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { EmailListService } from "./emailList.service";
import { EmailListControllerBase } from "./base/emailList.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("email-lists")
@common.Controller("email-lists")
export class EmailListController extends EmailListControllerBase {
  constructor(
    protected readonly service: EmailListService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
