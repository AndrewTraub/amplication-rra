import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateNotificationArgs } from "./CreateNotificationArgs";
import { UpdateNotificationArgs } from "./UpdateNotificationArgs";
import { DeleteNotificationArgs } from "./DeleteNotificationArgs";
import { FindManyNotificationArgs } from "./FindManyNotificationArgs";
import { FindOneNotificationArgs } from "./FindOneNotificationArgs";
import { Notification } from "./Notification";
import { FindManyLogEmailArgs } from "../../logEmail/base/FindManyLogEmailArgs";
import { LogEmail } from "../../logEmail/base/LogEmail";
import { FindManyLogTextArgs } from "../../logText/base/FindManyLogTextArgs";
import { LogText } from "../../logText/base/LogText";
import { Registration } from "../../registration/base/Registration";
import { NotificationService } from "../notification.service";

@graphql.Resolver(() => Notification)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class NotificationResolverBase {
  constructor(
    protected readonly service: NotificationService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Notification])
  @nestAccessControl.UseRoles({
    resource: "Notification",
    action: "read",
    possession: "any",
  })
  async notifications(
    @graphql.Args() args: FindManyNotificationArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Notification[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Notification",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Notification, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Notification",
    action: "read",
    possession: "own",
  })
  async notification(
    @graphql.Args() args: FindOneNotificationArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Notification | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Notification",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Notification)
  @nestAccessControl.UseRoles({
    resource: "Notification",
    action: "create",
    possession: "any",
  })
  async createNotification(
    @graphql.Args() args: CreateNotificationArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Notification> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Notification",
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
        `providing the properties: ${properties} on ${"Notification"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        registrationId: args.data.registrationId
          ? {
              connect: args.data.registrationId,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => Notification)
  @nestAccessControl.UseRoles({
    resource: "Notification",
    action: "update",
    possession: "any",
  })
  async updateNotification(
    @graphql.Args() args: UpdateNotificationArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Notification | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Notification",
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
        `providing the properties: ${properties} on ${"Notification"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          registrationId: args.data.registrationId
            ? {
                connect: args.data.registrationId,
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

  @graphql.Mutation(() => Notification)
  @nestAccessControl.UseRoles({
    resource: "Notification",
    action: "delete",
    possession: "any",
  })
  async deleteNotification(
    @graphql.Args() args: DeleteNotificationArgs
  ): Promise<Notification | null> {
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

  @graphql.ResolveField(() => [LogEmail])
  @nestAccessControl.UseRoles({
    resource: "Notification",
    action: "read",
    possession: "any",
  })
  async emailLog(
    @graphql.Parent() parent: Notification,
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

  @graphql.ResolveField(() => [LogText])
  @nestAccessControl.UseRoles({
    resource: "Notification",
    action: "read",
    possession: "any",
  })
  async smsLog(
    @graphql.Parent() parent: Notification,
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

  @graphql.ResolveField(() => Registration, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Notification",
    action: "read",
    possession: "any",
  })
  async registrationId(
    @graphql.Parent() parent: Notification,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Registration | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Registration",
    });
    const result = await this.service.getRegistrationId(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
