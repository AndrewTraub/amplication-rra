import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateUserArgs } from "./CreateUserArgs";
import { UpdateUserArgs } from "./UpdateUserArgs";
import { DeleteUserArgs } from "./DeleteUserArgs";
import { FindManyUserArgs } from "./FindManyUserArgs";
import { FindOneUserArgs } from "./FindOneUserArgs";
import { User } from "./User";
import { FindManyAffiliateStatArgs } from "../../affiliateStat/base/FindManyAffiliateStatArgs";
import { AffiliateStat } from "../../affiliateStat/base/AffiliateStat";
import { FindManyAgentArgs } from "../../agent/base/FindManyAgentArgs";
import { Agent } from "../../agent/base/Agent";
import { FindManyCompanyArgs } from "../../company/base/FindManyCompanyArgs";
import { Company } from "../../company/base/Company";
import { FindManyDocumentArgs } from "../../document/base/FindManyDocumentArgs";
import { Document } from "../../document/base/Document";
import { FindManyLogEmailArgs } from "../../logEmail/base/FindManyLogEmailArgs";
import { LogEmail } from "../../logEmail/base/LogEmail";
import { FindManyJournalArgs } from "../../journal/base/FindManyJournalArgs";
import { Journal } from "../../journal/base/Journal";
import { FindManyLogArgs } from "../../log/base/FindManyLogArgs";
import { Log } from "../../log/base/Log";
import { FindManyEmailQueueArgs } from "../../emailQueue/base/FindManyEmailQueueArgs";
import { EmailQueue } from "../../emailQueue/base/EmailQueue";
import { FindManyLogTextArgs } from "../../logText/base/FindManyLogTextArgs";
import { LogText } from "../../logText/base/LogText";
import { UserService } from "../user.service";

@graphql.Resolver(() => User)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class UserResolverBase {
  constructor(
    protected readonly service: UserService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [User])
  @nestAccessControl.UseRoles({
    resource: "User",
    action: "read",
    possession: "any",
  })
  async users(
    @graphql.Args() args: FindManyUserArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<User[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "User",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => User, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "User",
    action: "read",
    possession: "own",
  })
  async user(
    @graphql.Args() args: FindOneUserArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<User | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "User",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => User)
  @nestAccessControl.UseRoles({
    resource: "User",
    action: "create",
    possession: "any",
  })
  async createUser(
    @graphql.Args() args: CreateUserArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<User> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "User",
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
        `providing the properties: ${properties} on ${"User"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => User)
  @nestAccessControl.UseRoles({
    resource: "User",
    action: "update",
    possession: "any",
  })
  async updateUser(
    @graphql.Args() args: UpdateUserArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<User | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "User",
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
        `providing the properties: ${properties} on ${"User"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => User)
  @nestAccessControl.UseRoles({
    resource: "User",
    action: "delete",
    possession: "any",
  })
  async deleteUser(@graphql.Args() args: DeleteUserArgs): Promise<User | null> {
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

  @graphql.ResolveField(() => [AffiliateStat])
  @nestAccessControl.UseRoles({
    resource: "User",
    action: "read",
    possession: "any",
  })
  async affiliate(
    @graphql.Parent() parent: User,
    @graphql.Args() args: FindManyAffiliateStatArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<AffiliateStat[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "AffiliateStat",
    });
    const results = await this.service.findAffiliate(parent.id, args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [Agent])
  @nestAccessControl.UseRoles({
    resource: "User",
    action: "read",
    possession: "any",
  })
  async agent(
    @graphql.Parent() parent: User,
    @graphql.Args() args: FindManyAgentArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Agent[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Agent",
    });
    const results = await this.service.findAgent(parent.id, args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [Company])
  @nestAccessControl.UseRoles({
    resource: "User",
    action: "read",
    possession: "any",
  })
  async company(
    @graphql.Parent() parent: User,
    @graphql.Args() args: FindManyCompanyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Company[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Company",
    });
    const results = await this.service.findCompany(parent.id, args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [Document])
  @nestAccessControl.UseRoles({
    resource: "User",
    action: "read",
    possession: "any",
  })
  async document(
    @graphql.Parent() parent: User,
    @graphql.Args() args: FindManyDocumentArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Document[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Document",
    });
    const results = await this.service.findDocument(parent.id, args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [LogEmail])
  @nestAccessControl.UseRoles({
    resource: "User",
    action: "read",
    possession: "any",
  })
  async emailLog(
    @graphql.Parent() parent: User,
    @graphql.Args() args: FindManyLogEmailArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<LogEmail[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "LogEmail",
    });
    const results = await this.service.findEmailLog(parent.id, args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [Journal])
  @nestAccessControl.UseRoles({
    resource: "User",
    action: "read",
    possession: "any",
  })
  async journal(
    @graphql.Parent() parent: User,
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

  @graphql.ResolveField(() => [Log])
  @nestAccessControl.UseRoles({
    resource: "User",
    action: "read",
    possession: "any",
  })
  async log(
    @graphql.Parent() parent: User,
    @graphql.Args() args: FindManyLogArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Log[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Log",
    });
    const results = await this.service.findLog(parent.id, args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [EmailQueue])
  @nestAccessControl.UseRoles({
    resource: "User",
    action: "read",
    possession: "any",
  })
  async queue(
    @graphql.Parent() parent: User,
    @graphql.Args() args: FindManyEmailQueueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<EmailQueue[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "EmailQueue",
    });
    const results = await this.service.findQueue(parent.id, args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [LogText])
  @nestAccessControl.UseRoles({
    resource: "User",
    action: "read",
    possession: "any",
  })
  async smsLog(
    @graphql.Parent() parent: User,
    @graphql.Args() args: FindManyLogTextArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<LogText[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "LogText",
    });
    const results = await this.service.findSmsLog(parent.id, args);
    return results.map((result) => permission.filter(result));
  }
}
