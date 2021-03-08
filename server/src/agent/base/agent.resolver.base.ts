import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateAgentArgs } from "./CreateAgentArgs";
import { UpdateAgentArgs } from "./UpdateAgentArgs";
import { DeleteAgentArgs } from "./DeleteAgentArgs";
import { FindManyAgentArgs } from "./FindManyAgentArgs";
import { FindOneAgentArgs } from "./FindOneAgentArgs";
import { Agent } from "./Agent";
import { FindManyDocumentArgs } from "../../document/base/FindManyDocumentArgs";
import { Document } from "../../document/base/Document";
import { FindManyJournalArgs } from "../../journal/base/FindManyJournalArgs";
import { Journal } from "../../journal/base/Journal";
import { State } from "../../state/base/State";
import { User } from "../../user/base/User";
import { AgentService } from "../agent.service";

@graphql.Resolver(() => Agent)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class AgentResolverBase {
  constructor(
    protected readonly service: AgentService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Agent])
  @nestAccessControl.UseRoles({
    resource: "Agent",
    action: "read",
    possession: "any",
  })
  async agents(
    @graphql.Args() args: FindManyAgentArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Agent[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Agent",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Agent, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Agent",
    action: "read",
    possession: "own",
  })
  async agent(
    @graphql.Args() args: FindOneAgentArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Agent | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Agent",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Agent)
  @nestAccessControl.UseRoles({
    resource: "Agent",
    action: "create",
    possession: "any",
  })
  async createAgent(
    @graphql.Args() args: CreateAgentArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Agent> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Agent",
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
        `providing the properties: ${properties} on ${"Agent"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        state: {
          connect: args.data.state,
        },

        user: {
          connect: args.data.user,
        },
      },
    });
  }

  @graphql.Mutation(() => Agent)
  @nestAccessControl.UseRoles({
    resource: "Agent",
    action: "update",
    possession: "any",
  })
  async updateAgent(
    @graphql.Args() args: UpdateAgentArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Agent | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Agent",
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
        `providing the properties: ${properties} on ${"Agent"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          state: {
            connect: args.data.state,
          },

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

  @graphql.Mutation(() => Agent)
  @nestAccessControl.UseRoles({
    resource: "Agent",
    action: "delete",
    possession: "any",
  })
  async deleteAgent(
    @graphql.Args() args: DeleteAgentArgs
  ): Promise<Agent | null> {
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

  @graphql.ResolveField(() => [Document])
  @nestAccessControl.UseRoles({
    resource: "Agent",
    action: "read",
    possession: "any",
  })
  async document(
    @graphql.Parent() parent: Agent,
    @graphql.Args() args: FindManyDocumentArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Document[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Document",
    });
    const results = await this.service
      .findOne({ where: { id: parent.id } })
      // @ts-ignore
      .document(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [Journal])
  @nestAccessControl.UseRoles({
    resource: "Agent",
    action: "read",
    possession: "any",
  })
  async journal(
    @graphql.Parent() parent: Agent,
    @graphql.Args() args: FindManyJournalArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Journal[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Journal",
    });
    const results = await this.service
      .findOne({ where: { id: parent.id } })
      // @ts-ignore
      .journal(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => State, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Agent",
    action: "read",
    possession: "any",
  })
  async state(
    @graphql.Parent() parent: Agent,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<State | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "State",
    });
    const result = await this.service
      .findOne({ where: { id: parent.id } })
      .state();

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => User, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Agent",
    action: "read",
    possession: "any",
  })
  async user(
    @graphql.Parent() parent: Agent,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<User | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "User",
    });
    const result = await this.service
      .findOne({ where: { id: parent.id } })
      .user();

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
