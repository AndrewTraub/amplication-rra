import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { JournalCategoryResolverBase } from "./base/journalCategory.resolver.base";
import { JournalCategory } from "./base/JournalCategory";
import { JournalCategoryService } from "./journalCategory.service";

@graphql.Resolver(() => JournalCategory)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class JournalCategoryResolver extends JournalCategoryResolverBase {
  constructor(
    protected readonly service: JournalCategoryService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
