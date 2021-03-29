import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateLogTextArgs } from "./CreateLogTextArgs";
import { UpdateLogTextArgs } from "./UpdateLogTextArgs";
import { DeleteLogTextArgs } from "./DeleteLogTextArgs";
import { FindManyLogTextArgs } from "./FindManyLogTextArgs";
import { FindOneLogTextArgs } from "./FindOneLogTextArgs";
import { LogText } from "./LogText";
import { Notification } from "../../notification/base/Notification";
import { Registration } from "../../registration/base/Registration";
import { User } from "../../user/base/User";
import { LogTextService } from "../logText.service";

@graphql.Resolver(() => LogText)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class LogTextResolverBase {
  constructor(
    protected readonly service: LogTextService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [LogText])
  @nestAccessControl.UseRoles({
    resource: "LogText",
    action: "read",
    possession: "any",
  })
  async logSms(
    @graphql.Args() args: FindManyLogTextArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<LogText[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "LogText",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => LogText, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "LogText",
    action: "read",
    possession: "own",
  })
  async logText(
    @graphql.Args() args: FindOneLogTextArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<LogText | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "LogText",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => LogText)
  @nestAccessControl.UseRoles({
    resource: "LogText",
    action: "create",
    possession: "any",
  })
  async createLogText(
    @graphql.Args() args: CreateLogTextArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<LogText> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "LogText",
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
        `providing the properties: ${properties} on ${"LogText"} creation is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => LogText)
  @nestAccessControl.UseRoles({
    resource: "LogText",
    action: "update",
    possession: "any",
  })
  async updateLogText(
    @graphql.Args() args: UpdateLogTextArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<LogText | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "LogText",
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
        `providing the properties: ${properties} on ${"LogText"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => LogText)
  @nestAccessControl.UseRoles({
    resource: "LogText",
    action: "delete",
    possession: "any",
  })
  async deleteLogText(
    @graphql.Args() args: DeleteLogTextArgs
  ): Promise<LogText | null> {
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
    resource: "LogText",
    action: "read",
    possession: "any",
  })
  async notification(
    @graphql.Parent() parent: LogText,
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
    resource: "LogText",
    action: "read",
    possession: "any",
  })
  async registration(
    @graphql.Parent() parent: LogText,
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
    resource: "LogText",
    action: "read",
    possession: "any",
  })
  async user(
    @graphql.Parent() parent: LogText,
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
