import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { LogEmailResolverBase } from "./base/logEmail.resolver.base";
import { LogEmail } from "./base/LogEmail";
import { LogEmailService } from "./logEmail.service";

@graphql.Resolver(() => LogEmail)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class LogEmailResolver extends LogEmailResolverBase {
  constructor(
    protected readonly service: LogEmailService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
