import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateGeoCityArgs } from "./CreateGeoCityArgs";
import { UpdateGeoCityArgs } from "./UpdateGeoCityArgs";
import { DeleteGeoCityArgs } from "./DeleteGeoCityArgs";
import { FindManyGeoCityArgs } from "./FindManyGeoCityArgs";
import { FindOneGeoCityArgs } from "./FindOneGeoCityArgs";
import { GeoCity } from "./GeoCity";
import { GeoCountry } from "../../geoCountry/base/GeoCountry";
import { GeoState } from "../../geoState/base/GeoState";
import { GeoCityService } from "../geoCity.service";

@graphql.Resolver(() => GeoCity)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class GeoCityResolverBase {
  constructor(
    protected readonly service: GeoCityService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [GeoCity])
  @nestAccessControl.UseRoles({
    resource: "GeoCity",
    action: "read",
    possession: "any",
  })
  async geoCities(
    @graphql.Args() args: FindManyGeoCityArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<GeoCity[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "GeoCity",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => GeoCity, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "GeoCity",
    action: "read",
    possession: "own",
  })
  async geoCity(
    @graphql.Args() args: FindOneGeoCityArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<GeoCity | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "GeoCity",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => GeoCity)
  @nestAccessControl.UseRoles({
    resource: "GeoCity",
    action: "create",
    possession: "any",
  })
  async createGeoCity(
    @graphql.Args() args: CreateGeoCityArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<GeoCity> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "GeoCity",
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
        `providing the properties: ${properties} on ${"GeoCity"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        country: {
          connect: args.data.country,
        },

        state: {
          connect: args.data.state,
        },
      },
    });
  }

  @graphql.Mutation(() => GeoCity)
  @nestAccessControl.UseRoles({
    resource: "GeoCity",
    action: "update",
    possession: "any",
  })
  async updateGeoCity(
    @graphql.Args() args: UpdateGeoCityArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<GeoCity | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "GeoCity",
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
        `providing the properties: ${properties} on ${"GeoCity"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          country: {
            connect: args.data.country,
          },

          state: {
            connect: args.data.state,
          },
        },
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

  @graphql.Mutation(() => GeoCity)
  @nestAccessControl.UseRoles({
    resource: "GeoCity",
    action: "delete",
    possession: "any",
  })
  async deleteGeoCity(
    @graphql.Args() args: DeleteGeoCityArgs
  ): Promise<GeoCity | null> {
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

  @graphql.ResolveField(() => GeoCountry, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "GeoCity",
    action: "read",
    possession: "any",
  })
  async country(
    @graphql.Parent() parent: GeoCity,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<GeoCountry | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "GeoCountry",
    });
    const result = await this.service
      .findOne({ where: { id: parent.id } })
      .country();

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => GeoState, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "GeoCity",
    action: "read",
    possession: "any",
  })
  async state(
    @graphql.Parent() parent: GeoCity,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<GeoState | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "GeoState",
    });
    const result = await this.service
      .findOne({ where: { id: parent.id } })
      .state();

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
