import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { AffiliateStatResolverBase } from "./base/affiliateStat.resolver.base";
import { AffiliateStat } from "./base/AffiliateStat";
import { AffiliateStatService } from "./affiliateStat.service";

@graphql.Resolver(() => AffiliateStat)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class AffiliateStatResolver extends AffiliateStatResolverBase {
  constructor(
    protected readonly service: AffiliateStatService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
