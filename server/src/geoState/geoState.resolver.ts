import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { GeoStateResolverBase } from "./base/geoState.resolver.base";
import { GeoState } from "./base/GeoState";
import { GeoStateService } from "./geoState.service";

@graphql.Resolver(() => GeoState)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class GeoStateResolver extends GeoStateResolverBase {
  constructor(
    protected readonly service: GeoStateService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
