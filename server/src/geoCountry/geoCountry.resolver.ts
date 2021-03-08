import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { GeoCountryResolverBase } from "./base/geoCountry.resolver.base";
import { GeoCountry } from "./base/GeoCountry";
import { GeoCountryService } from "./geoCountry.service";

@graphql.Resolver(() => GeoCountry)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class GeoCountryResolver extends GeoCountryResolverBase {
  constructor(
    protected readonly service: GeoCountryService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
