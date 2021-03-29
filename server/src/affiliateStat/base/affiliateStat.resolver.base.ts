import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateAffiliateStatArgs } from "./CreateAffiliateStatArgs";
import { UpdateAffiliateStatArgs } from "./UpdateAffiliateStatArgs";
import { DeleteAffiliateStatArgs } from "./DeleteAffiliateStatArgs";
import { FindManyAffiliateStatArgs } from "./FindManyAffiliateStatArgs";
import { FindOneAffiliateStatArgs } from "./FindOneAffiliateStatArgs";
import { AffiliateStat } from "./AffiliateStat";
import { User } from "../../user/base/User";
import { AffiliateStatService } from "../affiliateStat.service";

@graphql.Resolver(() => AffiliateStat)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class AffiliateStatResolverBase {
  constructor(
    protected readonly service: AffiliateStatService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [AffiliateStat])
  @nestAccessControl.UseRoles({
    resource: "AffiliateStat",
    action: "read",
    possession: "any",
  })
  async affiliateStats(
    @graphql.Args() args: FindManyAffiliateStatArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<AffiliateStat[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "AffiliateStat",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => AffiliateStat, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "AffiliateStat",
    action: "read",
    possession: "own",
  })
  async affiliateStat(
    @graphql.Args() args: FindOneAffiliateStatArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<AffiliateStat | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "AffiliateStat",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => AffiliateStat)
  @nestAccessControl.UseRoles({
    resource: "AffiliateStat",
    action: "create",
    possession: "any",
  })
  async createAffiliateStat(
    @graphql.Args() args: CreateAffiliateStatArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<AffiliateStat> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "AffiliateStat",
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
        `providing the properties: ${properties} on ${"AffiliateStat"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        user: {
          connect: args.data.user,
        },
      },
    });
  }

  @graphql.Mutation(() => AffiliateStat)
  @nestAccessControl.UseRoles({
    resource: "AffiliateStat",
    action: "update",
    possession: "any",
  })
  async updateAffiliateStat(
    @graphql.Args() args: UpdateAffiliateStatArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<AffiliateStat | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "AffiliateStat",
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
        `providing the properties: ${properties} on ${"AffiliateStat"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          user: {
            connect: args.data.user,
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

  @graphql.Mutation(() => AffiliateStat)
  @nestAccessControl.UseRoles({
    resource: "AffiliateStat",
    action: "delete",
    possession: "any",
  })
  async deleteAffiliateStat(
    @graphql.Args() args: DeleteAffiliateStatArgs
  ): Promise<AffiliateStat | null> {
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

  @graphql.ResolveField(() => User, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "AffiliateStat",
    action: "read",
    possession: "any",
  })
  async user(
    @graphql.Parent() parent: AffiliateStat,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<User | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "User",
    });
    const result = await this.service.getUser(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
