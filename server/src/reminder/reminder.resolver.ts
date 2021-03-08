import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { ReminderResolverBase } from "./base/reminder.resolver.base";
import { Reminder } from "./base/Reminder";
import { ReminderService } from "./reminder.service";

@graphql.Resolver(() => Reminder)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class ReminderResolver extends ReminderResolverBase {
  constructor(
    protected readonly service: ReminderService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
