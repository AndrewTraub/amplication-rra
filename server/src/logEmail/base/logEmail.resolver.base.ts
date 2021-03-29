import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateLogEmailArgs } from "./CreateLogEmailArgs";
import { UpdateLogEmailArgs } from "./UpdateLogEmailArgs";
import { DeleteLogEmailArgs } from "./DeleteLogEmailArgs";
import { FindManyLogEmailArgs } from "./FindManyLogEmailArgs";
import { FindOneLogEmailArgs } from "./FindOneLogEmailArgs";
import { LogEmail } from "./LogEmail";
import { Notification } from "../../notification/base/Notification";
import { Registration } from "../../registration/base/Registration";
import { User } from "../../user/base/User";
import { LogEmailService } from "../logEmail.service";

@graphql.Resolver(() => LogEmail)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class LogEmailResolverBase {
  constructor(
    protected readonly service: LogEmailService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [LogEmail])
  @nestAccessControl.UseRoles({
    resource: "LogEmail",
    action: "read",
    possession: "any",
  })
  async logEmails(
    @graphql.Args() args: FindManyLogEmailArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<LogEmail[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "LogEmail",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => LogEmail, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "LogEmail",
    action: "read",
    possession: "own",
  })
  async logEmail(
    @graphql.Args() args: FindOneLogEmailArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<LogEmail | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "LogEmail",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => LogEmail)
  @nestAccessControl.UseRoles({
    resource: "LogEmail",
    action: "create",
    possession: "any",
  })
  async createLogEmail(
    @graphql.Args() args: CreateLogEmailArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<LogEmail> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "LogEmail",
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
        `providing the properties: ${properties} on ${"LogEmail"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        notification: args.data.notification
          ? {
              connect: args.data.notification,
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

  @graphql.Mutation(() => LogEmail)
  @nestAccessControl.UseRoles({
    resource: "LogEmail",
    action: "update",
    possession: "any",
  })
  async updateLogEmail(
    @graphql.Args() args: UpdateLogEmailArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<LogEmail | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "LogEmail",
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
        `providing the properties: ${properties} on ${"LogEmail"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          notification: args.data.notification
            ? {
                connect: args.data.notification,
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

  @graphql.Mutation(() => LogEmail)
  @nestAccessControl.UseRoles({
    resource: "LogEmail",
    action: "delete",
    possession: "any",
  })
  async deleteLogEmail(
    @graphql.Args() args: DeleteLogEmailArgs
  ): Promise<LogEmail | null> {
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

  @graphql.ResolveField(() => Notification, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "LogEmail",
    action: "read",
    possession: "any",
  })
  async notification(
    @graphql.Parent() parent: LogEmail,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Notification | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Notification",
    });
    const result = await this.service.getNotification(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => Registration, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "LogEmail",
    action: "read",
    possession: "any",
  })
  async registration(
    @graphql.Parent() parent: LogEmail,
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
    resource: "LogEmail",
    action: "read",
    possession: "any",
  })
  async user(
    @graphql.Parent() parent: LogEmail,
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
