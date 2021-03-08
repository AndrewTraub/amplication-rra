import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { JournalCategoryService } from "./journalCategory.service";
import { JournalCategoryControllerBase } from "./base/journalCategory.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("journal-categories")
@common.Controller("journal-categories")
export class JournalCategoryController extends JournalCategoryControllerBase {
  constructor(
    protected readonly service: JournalCategoryService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
