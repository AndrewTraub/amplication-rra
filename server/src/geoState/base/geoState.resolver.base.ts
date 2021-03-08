import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateGeoStateArgs } from "./CreateGeoStateArgs";
import { UpdateGeoStateArgs } from "./UpdateGeoStateArgs";
import { DeleteGeoStateArgs } from "./DeleteGeoStateArgs";
import { FindManyGeoStateArgs } from "./FindManyGeoStateArgs";
import { FindOneGeoStateArgs } from "./FindOneGeoStateArgs";
import { GeoState } from "./GeoState";
import { FindManyGeoCityArgs } from "../../geoCity/base/FindManyGeoCityArgs";
import { GeoCity } from "../../geoCity/base/GeoCity";
import { GeoCountry } from "../../geoCountry/base/GeoCountry";
import { GeoStateService } from "../geoState.service";

@graphql.Resolver(() => GeoState)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class GeoStateResolverBase {
  constructor(
    protected readonly service: GeoStateService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [GeoState])
  @nestAccessControl.UseRoles({
    resource: "GeoState",
    action: "read",
    possession: "any",
  })
  async geoStates(
    @graphql.Args() args: FindManyGeoStateArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<GeoState[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "GeoState",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => GeoState, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "GeoState",
    action: "read",
    possession: "own",
  })
  async geoState(
    @graphql.Args() args: FindOneGeoStateArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<GeoState | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "GeoState",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => GeoState)
  @nestAccessControl.UseRoles({
    resource: "GeoState",
    action: "create",
    possession: "any",
  })
  async createGeoState(
    @graphql.Args() args: CreateGeoStateArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<GeoState> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "GeoState",
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
        `providing the properties: ${properties} on ${"GeoState"} creation is forbidden for roles: ${roles}`
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
      },
    });
  }

  @graphql.Mutation(() => GeoState)
  @nestAccessControl.UseRoles({
    resource: "GeoState",
    action: "update",
    possession: "any",
  })
  async updateGeoState(
    @graphql.Args() args: UpdateGeoStateArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<GeoState | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "GeoState",
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
        `providing the properties: ${properties} on ${"GeoState"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => GeoState)
  @nestAccessControl.UseRoles({
    resource: "GeoState",
    action: "delete",
    possession: "any",
  })
  async deleteGeoState(
    @graphql.Args() args: DeleteGeoStateArgs
  ): Promise<GeoState | null> {
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
    resource: "GeoState",
    action: "read",
    possession: "any",
  })
  async city(
    @graphql.Parent() parent: GeoState,
    @graphql.Args() args: FindManyGeoCityArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<GeoCity[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "GeoCity",
    });
    const results = await this.service
      .findOne({ where: { id: parent.id } })
      // @ts-ignore
      .city(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => GeoCountry, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "GeoState",
    action: "read",
    possession: "any",
  })
  async country(
    @graphql.Parent() parent: GeoState,
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
}
