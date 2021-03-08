import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { EmailListResolverBase } from "./base/emailList.resolver.base";
import { EmailList } from "./base/EmailList";
import { EmailListService } from "./emailList.service";

@graphql.Resolver(() => EmailList)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class EmailListResolver extends EmailListResolverBase {
  constructor(
    protected readonly service: EmailListService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
