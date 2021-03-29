import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateEmailQueueArgs } from "./CreateEmailQueueArgs";
import { UpdateEmailQueueArgs } from "./UpdateEmailQueueArgs";
import { DeleteEmailQueueArgs } from "./DeleteEmailQueueArgs";
import { FindManyEmailQueueArgs } from "./FindManyEmailQueueArgs";
import { FindOneEmailQueueArgs } from "./FindOneEmailQueueArgs";
import { EmailQueue } from "./EmailQueue";
import { User } from "../../user/base/User";
import { EmailQueueService } from "../emailQueue.service";

@graphql.Resolver(() => EmailQueue)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class EmailQueueResolverBase {
  constructor(
    protected readonly service: EmailQueueService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [EmailQueue])
  @nestAccessControl.UseRoles({
    resource: "EmailQueue",
    action: "read",
    possession: "any",
  })
  async emailQueues(
    @graphql.Args() args: FindManyEmailQueueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<EmailQueue[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "EmailQueue",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => EmailQueue, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "EmailQueue",
    action: "read",
    possession: "own",
  })
  async emailQueue(
    @graphql.Args() args: FindOneEmailQueueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<EmailQueue | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "EmailQueue",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => EmailQueue)
  @nestAccessControl.UseRoles({
    resource: "EmailQueue",
    action: "create",
    possession: "any",
  })
  async createEmailQueue(
    @graphql.Args() args: CreateEmailQueueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<EmailQueue> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "EmailQueue",
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
        `providing the properties: ${properties} on ${"EmailQueue"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        user: args.data.user
          ? {
              connect: args.data.user,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => EmailQueue)
  @nestAccessControl.UseRoles({
    resource: "EmailQueue",
    action: "update",
    possession: "any",
  })
  async updateEmailQueue(
    @graphql.Args() args: UpdateEmailQueueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<EmailQueue | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "EmailQueue",
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
        `providing the properties: ${properties} on ${"EmailQueue"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

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

  @graphql.Mutation(() => EmailQueue)
  @nestAccessControl.UseRoles({
    resource: "EmailQueue",
    action: "delete",
    possession: "any",
  })
  async deleteEmailQueue(
    @graphql.Args() args: DeleteEmailQueueArgs
  ): Promise<EmailQueue | null> {
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
    resource: "EmailQueue",
    action: "read",
    possession: "any",
  })
  async user(
    @graphql.Parent() parent: EmailQueue,
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
