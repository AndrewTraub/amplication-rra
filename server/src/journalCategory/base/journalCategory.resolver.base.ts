import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateJournalCategoryArgs } from "./CreateJournalCategoryArgs";
import { UpdateJournalCategoryArgs } from "./UpdateJournalCategoryArgs";
import { DeleteJournalCategoryArgs } from "./DeleteJournalCategoryArgs";
import { FindManyJournalCategoryArgs } from "./FindManyJournalCategoryArgs";
import { FindOneJournalCategoryArgs } from "./FindOneJournalCategoryArgs";
import { JournalCategory } from "./JournalCategory";
import { FindManyJournalArgs } from "../../journal/base/FindManyJournalArgs";
import { Journal } from "../../journal/base/Journal";
import { JournalCategoryService } from "../journalCategory.service";

@graphql.Resolver(() => JournalCategory)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class JournalCategoryResolverBase {
  constructor(
    protected readonly service: JournalCategoryService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [JournalCategory])
  @nestAccessControl.UseRoles({
    resource: "JournalCategory",
    action: "read",
    possession: "any",
  })
  async journalCategories(
    @graphql.Args() args: FindManyJournalCategoryArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<JournalCategory[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "JournalCategory",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => JournalCategory, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "JournalCategory",
    action: "read",
    possession: "own",
  })
  async journalCategory(
    @graphql.Args() args: FindOneJournalCategoryArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<JournalCategory | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "JournalCategory",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => JournalCategory)
  @nestAccessControl.UseRoles({
    resource: "JournalCategory",
    action: "create",
    possession: "any",
  })
  async createJournalCategory(
    @graphql.Args() args: CreateJournalCategoryArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<JournalCategory> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "JournalCategory",
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
        `providing the properties: ${properties} on ${"JournalCategory"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => JournalCategory)
  @nestAccessControl.UseRoles({
    resource: "JournalCategory",
    action: "update",
    possession: "any",
  })
  async updateJournalCategory(
    @graphql.Args() args: UpdateJournalCategoryArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<JournalCategory | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "JournalCategory",
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
        `providing the properties: ${properties} on ${"JournalCategory"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => JournalCategory)
  @nestAccessControl.UseRoles({
    resource: "JournalCategory",
    action: "delete",
    possession: "any",
  })
  async deleteJournalCategory(
    @graphql.Args() args: DeleteJournalCategoryArgs
  ): Promise<JournalCategory | null> {
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

  @graphql.ResolveField(() => [Journal])
  @nestAccessControl.UseRoles({
    resource: "JournalCategory",
    action: "read",
    possession: "any",
  })
  async journal(
    @graphql.Parent() parent: JournalCategory,
    @graphql.Args() args: FindManyJournalArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Journal[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Journal",
    });
    const results = await this.service.findJournal(parent.id, args);
    return results.map((result) => permission.filter(result));
  }
}
