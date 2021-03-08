import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { EmailQueueResolverBase } from "./base/emailQueue.resolver.base";
import { EmailQueue } from "./base/EmailQueue";
import { EmailQueueService } from "./emailQueue.service";

@graphql.Resolver(() => EmailQueue)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class EmailQueueResolver extends EmailQueueResolverBase {
  constructor(
    protected readonly service: EmailQueueService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
