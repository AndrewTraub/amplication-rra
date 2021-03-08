import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ReminderService } from "./reminder.service";
import { ReminderControllerBase } from "./base/reminder.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("reminders")
@common.Controller("reminders")
export class ReminderController extends ReminderControllerBase {
  constructor(
    protected readonly service: ReminderService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
