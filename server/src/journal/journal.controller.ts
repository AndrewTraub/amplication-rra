import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { JournalService } from "./journal.service";
import { JournalControllerBase } from "./base/journal.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("journals")
@common.Controller("journals")
export class JournalController extends JournalControllerBase {
  constructor(
    protected readonly service: JournalService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
