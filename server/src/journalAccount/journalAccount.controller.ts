import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { JournalAccountService } from "./journalAccount.service";
import { JournalAccountControllerBase } from "./base/journalAccount.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("journal-accounts")
@common.Controller("journal-accounts")
export class JournalAccountController extends JournalAccountControllerBase {
  constructor(
    protected readonly service: JournalAccountService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
