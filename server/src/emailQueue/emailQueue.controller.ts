import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { EmailQueueService } from "./emailQueue.service";
import { EmailQueueControllerBase } from "./base/emailQueue.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("email-queues")
@common.Controller("email-queues")
export class EmailQueueController extends EmailQueueControllerBase {
  constructor(
    protected readonly service: EmailQueueService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
