import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateJournalArgs } from "./CreateJournalArgs";
import { UpdateJournalArgs } from "./UpdateJournalArgs";
import { DeleteJournalArgs } from "./DeleteJournalArgs";
import { FindManyJournalArgs } from "./FindManyJournalArgs";
import { FindOneJournalArgs } from "./FindOneJournalArgs";
import { Journal } from "./Journal";
import { JournalAccount } from "../../journalAccount/base/JournalAccount";
import { Agent } from "../../agent/base/Agent";
import { JournalCategory } from "../../journalCategory/base/JournalCategory";
import { Registration } from "../../registration/base/Registration";
import { User } from "../../user/base/User";
import { JournalService } from "../journal.service";

@graphql.Resolver(() => Journal)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class JournalResolverBase {
  constructor(
    protected readonly service: JournalService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Journal])
  @nestAccessControl.UseRoles({
    resource: "Journal",
    action: "read",
    possession: "any",
  })
  async journals(
    @graphql.Args() args: FindManyJournalArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Journal[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Journal",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Journal, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Journal",
    action: "read",
    possession: "own",
  })
  async journal(
    @graphql.Args() args: FindOneJournalArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Journal | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Journal",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Journal)
  @nestAccessControl.UseRoles({
    resource: "Journal",
    action: "create",
    possession: "any",
  })
  async createJournal(
    @graphql.Args() args: CreateJournalArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Journal> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Journal",
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
        `providing the properties: ${properties} on ${"Journal"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        account: {
          connect: args.data.account,
        },

        agent: args.data.agent
          ? {
              connect: args.data.agent,
            }
          : undefined,

        category: args.data.category
          ? {
              connect: args.data.category,
            }
          : undefined,

        registration: args.data.registration
          ? {
              connect: args.data.registration,
            }
          : undefined,

        user: args.data.user
          ? {
              connect: args.data.user,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => Journal)
  @nestAccessControl.UseRoles({
    resource: "Journal",
    action: "update",
    possession: "any",
  })
  async updateJournal(
    @graphql.Args() args: UpdateJournalArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Journal | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Journal",
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
        `providing the properties: ${properties} on ${"Journal"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          account: {
            connect: args.data.account,
          },

          agent: args.data.agent
            ? {
                connect: args.data.agent,
              }
            : undefined,

          category: args.data.category
            ? {
                connect: args.data.category,
              }
            : undefined,

          registration: args.data.registration
            ? {
                connect: args.data.registration,
              }
            : undefined,

          user: args.data.user
            ? {
                connect: args.data.user,
              }
            : undefined,
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

  @graphql.Mutation(() => Journal)
  @nestAccessControl.UseRoles({
    resource: "Journal",
    action: "delete",
    possession: "any",
  })
  async deleteJournal(
    @graphql.Args() args: DeleteJournalArgs
  ): Promise<Journal | null> {
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

  @graphql.ResolveField(() => JournalAccount, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Journal",
    action: "read",
    possession: "any",
  })
  async account(
    @graphql.Parent() parent: Journal,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<JournalAccount | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "JournalAccount",
    });
    const result = await this.service.getAccount(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => Agent, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Journal",
    action: "read",
    possession: "any",
  })
  async agent(
    @graphql.Parent() parent: Journal,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Agent | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Agent",
    });
    const result = await this.service.getAgent(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => JournalCategory, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Journal",
    action: "read",
    possession: "any",
  })
  async category(
    @graphql.Parent() parent: Journal,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<JournalCategory | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "JournalCategory",
    });
    const result = await this.service.getCategory(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => Registration, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Journal",
    action: "read",
    possession: "any",
  })
  async registration(
    @graphql.Parent() parent: Journal,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Registration | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Registration",
    });
    const result = await this.service.getRegistration(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => User, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Journal",
    action: "read",
    possession: "any",
  })
  async user(
    @graphql.Parent() parent: Journal,
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
