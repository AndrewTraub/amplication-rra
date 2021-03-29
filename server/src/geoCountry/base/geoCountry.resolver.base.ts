import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateGeoCountryArgs } from "./CreateGeoCountryArgs";
import { UpdateGeoCountryArgs } from "./UpdateGeoCountryArgs";
import { DeleteGeoCountryArgs } from "./DeleteGeoCountryArgs";
import { FindManyGeoCountryArgs } from "./FindManyGeoCountryArgs";
import { FindOneGeoCountryArgs } from "./FindOneGeoCountryArgs";
import { GeoCountry } from "./GeoCountry";
import { FindManyGeoCityArgs } from "../../geoCity/base/FindManyGeoCityArgs";
import { GeoCity } from "../../geoCity/base/GeoCity";
import { FindManyGeoStateArgs } from "../../geoState/base/FindManyGeoStateArgs";
import { GeoState } from "../../geoState/base/GeoState";
import { GeoCountryService } from "../geoCountry.service";

@graphql.Resolver(() => GeoCountry)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class GeoCountryResolverBase {
  constructor(
    protected readonly service: GeoCountryService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [GeoCountry])
  @nestAccessControl.UseRoles({
    resource: "GeoCountry",
    action: "read",
    possession: "any",
  })
  async geoCountries(
    @graphql.Args() args: FindManyGeoCountryArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<GeoCountry[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "GeoCountry",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => GeoCountry, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "GeoCountry",
    action: "read",
    possession: "own",
  })
  async geoCountry(
    @graphql.Args() args: FindOneGeoCountryArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<GeoCountry | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "GeoCountry",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => GeoCountry)
  @nestAccessControl.UseRoles({
    resource: "GeoCountry",
    action: "create",
    possession: "any",
  })
  async createGeoCountry(
    @graphql.Args() args: CreateGeoCountryArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<GeoCountry> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "GeoCountry",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"GeoCountry"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => GeoCountry)
  @nestAccessControl.UseRoles({
    resource: "GeoCountry",
    action: "update",
    possession: "any",
  })
  async updateGeoCountry(
    @graphql.Args() args: UpdateGeoCountryArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<GeoCountry | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "GeoCountry",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"GeoCountry"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => GeoCountry)
  @nestAccessControl.UseRoles({
    resource: "GeoCountry",
    action: "delete",
    possession: "any",
  })
  async deleteGeoCountry(
    @graphql.Args() args: DeleteGeoCountryArgs
  ): Promise<GeoCountry | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.ResolveField(() => [GeoCity])
  @nestAccessControl.UseRoles({
    resource: "GeoCountry",
    action: "read",
    possession: "any",
  })
  async city(
    @graphql.Parent() parent: GeoCountry,
    @graphql.Args() args: FindManyGeoCityArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<GeoCity[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "GeoCity",
    });
    const results = await this.service.findCity(parent.id, args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [GeoState])
  @nestAccessControl.UseRoles({
    resource: "GeoCountry",
    action: "read",
    possession: "any",
  })
  async state(
    @graphql.Parent() parent: GeoCountry,
    @graphql.Args() args: FindManyGeoStateArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<GeoState[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "GeoState",
    });
    const results = await this.service.findState(parent.id, args);
    return results.map((result) => permission.filter(result));
  }
}
