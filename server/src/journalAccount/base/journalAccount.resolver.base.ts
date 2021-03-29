import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateJournalAccountArgs } from "./CreateJournalAccountArgs";
import { UpdateJournalAccountArgs } from "./UpdateJournalAccountArgs";
import { DeleteJournalAccountArgs } from "./DeleteJournalAccountArgs";
import { FindManyJournalAccountArgs } from "./FindManyJournalAccountArgs";
import { FindOneJournalAccountArgs } from "./FindOneJournalAccountArgs";
import { JournalAccount } from "./JournalAccount";
import { FindManyJournalArgs } from "../../journal/base/FindManyJournalArgs";
import { Journal } from "../../journal/base/Journal";
import { JournalAccountService } from "../journalAccount.service";

@graphql.Resolver(() => JournalAccount)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class JournalAccountResolverBase {
  constructor(
    protected readonly service: JournalAccountService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [JournalAccount])
  @nestAccessControl.UseRoles({
    resource: "JournalAccount",
    action: "read",
    possession: "any",
  })
  async journalAccounts(
    @graphql.Args() args: FindManyJournalAccountArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<JournalAccount[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "JournalAccount",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => JournalAccount, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "JournalAccount",
    action: "read",
    possession: "own",
  })
  async journalAccount(
    @graphql.Args() args: FindOneJournalAccountArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<JournalAccount | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "JournalAccount",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => JournalAccount)
  @nestAccessControl.UseRoles({
    resource: "JournalAccount",
    action: "create",
    possession: "any",
  })
  async createJournalAccount(
    @graphql.Args() args: CreateJournalAccountArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<JournalAccount> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "JournalAccount",
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
        `providing the properties: ${properties} on ${"JournalAccount"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => JournalAccount)
  @nestAccessControl.UseRoles({
    resource: "JournalAccount",
    action: "update",
    possession: "any",
  })
  async updateJournalAccount(
    @graphql.Args() args: UpdateJournalAccountArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<JournalAccount | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "JournalAccount",
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
        `providing the properties: ${properties} on ${"JournalAccount"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => JournalAccount)
  @nestAccessControl.UseRoles({
    resource: "JournalAccount",
    action: "delete",
    possession: "any",
  })
  async deleteJournalAccount(
    @graphql.Args() args: DeleteJournalAccountArgs
  ): Promise<JournalAccount | null> {
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
    resource: "JournalAccount",
    action: "read",
    possession: "any",
  })
  async account(
    @graphql.Parent() parent: JournalAccount,
    @graphql.Args() args: FindManyJournalArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Journal[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Journal",
    });
    const results = await this.service.findAccount(parent.id, args);
    return results.map((result) => permission.filter(result));
  }
}
