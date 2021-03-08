import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { GeoCityResolverBase } from "./base/geoCity.resolver.base";
import { GeoCity } from "./base/GeoCity";
import { GeoCityService } from "./geoCity.service";

@graphql.Resolver(() => GeoCity)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class GeoCityResolver extends GeoCityResolverBase {
  constructor(
    protected readonly service: GeoCityService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
