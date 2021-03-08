import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { JournalAccountResolverBase } from "./base/journalAccount.resolver.base";
import { JournalAccount } from "./base/JournalAccount";
import { JournalAccountService } from "./journalAccount.service";

@graphql.Resolver(() => JournalAccount)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class JournalAccountResolver extends JournalAccountResolverBase {
  constructor(
    protected readonly service: JournalAccountService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
