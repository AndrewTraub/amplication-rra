import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateReminderArgs } from "./CreateReminderArgs";
import { UpdateReminderArgs } from "./UpdateReminderArgs";
import { DeleteReminderArgs } from "./DeleteReminderArgs";
import { FindManyReminderArgs } from "./FindManyReminderArgs";
import { FindOneReminderArgs } from "./FindOneReminderArgs";
import { Reminder } from "./Reminder";
import { State } from "../../state/base/State";
import { ReminderService } from "../reminder.service";

@graphql.Resolver(() => Reminder)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class ReminderResolverBase {
  constructor(
    protected readonly service: ReminderService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Reminder])
  @nestAccessControl.UseRoles({
    resource: "Reminder",
    action: "read",
    possession: "any",
  })
  async reminders(
    @graphql.Args() args: FindManyReminderArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Reminder[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Reminder",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Reminder, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Reminder",
    action: "read",
    possession: "own",
  })
  async reminder(
    @graphql.Args() args: FindOneReminderArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Reminder | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Reminder",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Reminder)
  @nestAccessControl.UseRoles({
    resource: "Reminder",
    action: "create",
    possession: "any",
  })
  async createReminder(
    @graphql.Args() args: CreateReminderArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Reminder> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Reminder",
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
        `providing the properties: ${properties} on ${"Reminder"} creation is forbidden for roles: ${roles}`
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
      },
    });
  }

  @graphql.Mutation(() => Reminder)
  @nestAccessControl.UseRoles({
    resource: "Reminder",
    action: "update",
    possession: "any",
  })
  async updateReminder(
    @graphql.Args() args: UpdateReminderArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Reminder | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Reminder",
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
        `providing the properties: ${properties} on ${"Reminder"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => Reminder)
  @nestAccessControl.UseRoles({
    resource: "Reminder",
    action: "delete",
    possession: "any",
  })
  async deleteReminder(
    @graphql.Args() args: DeleteReminderArgs
  ): Promise<Reminder | null> {
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

  @graphql.ResolveField(() => State, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Reminder",
    action: "read",
    possession: "any",
  })
  async state(
    @graphql.Parent() parent: Reminder,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<State | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "State",
    });
    const result = await this.service.getState(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
