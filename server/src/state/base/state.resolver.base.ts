import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateStateArgs } from "./CreateStateArgs";
import { UpdateStateArgs } from "./UpdateStateArgs";
import { DeleteStateArgs } from "./DeleteStateArgs";
import { FindManyStateArgs } from "./FindManyStateArgs";
import { FindOneStateArgs } from "./FindOneStateArgs";
import { State } from "./State";
import { FindManyAgentArgs } from "../../agent/base/FindManyAgentArgs";
import { Agent } from "../../agent/base/Agent";
import { FindManyPdfFormArgs } from "../../pdfForm/base/FindManyPdfFormArgs";
import { PdfForm } from "../../pdfForm/base/PdfForm";
import { FindManyReminderArgs } from "../../reminder/base/FindManyReminderArgs";
import { Reminder } from "../../reminder/base/Reminder";
import { StateService } from "../state.service";

@graphql.Resolver(() => State)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class StateResolverBase {
  constructor(
    protected readonly service: StateService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [State])
  @nestAccessControl.UseRoles({
    resource: "State",
    action: "read",
    possession: "any",
  })
  async states(
    @graphql.Args() args: FindManyStateArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<State[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "State",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => State, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "State",
    action: "read",
    possession: "own",
  })
  async state(
    @graphql.Args() args: FindOneStateArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<State | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "State",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => State)
  @nestAccessControl.UseRoles({
    resource: "State",
    action: "create",
    possession: "any",
  })
  async createState(
    @graphql.Args() args: CreateStateArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<State> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "State",
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
        `providing the properties: ${properties} on ${"State"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => State)
  @nestAccessControl.UseRoles({
    resource: "State",
    action: "update",
    possession: "any",
  })
  async updateState(
    @graphql.Args() args: UpdateStateArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<State | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "State",
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
        `providing the properties: ${properties} on ${"State"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => State)
  @nestAccessControl.UseRoles({
    resource: "State",
    action: "delete",
    possession: "any",
  })
  async deleteState(
    @graphql.Args() args: DeleteStateArgs
  ): Promise<State | null> {
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

  @graphql.ResolveField(() => [Agent])
  @nestAccessControl.UseRoles({
    resource: "State",
    action: "read",
    possession: "any",
  })
  async agent(
    @graphql.Parent() parent: State,
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

  @graphql.ResolveField(() => [PdfForm])
  @nestAccessControl.UseRoles({
    resource: "State",
    action: "read",
    possession: "any",
  })
  async form(
    @graphql.Parent() parent: State,
    @graphql.Args() args: FindManyPdfFormArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<PdfForm[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "PdfForm",
    });
    const results = await this.service.findForm(parent.id, args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [Reminder])
  @nestAccessControl.UseRoles({
    resource: "State",
    action: "read",
    possession: "any",
  })
  async reminder(
    @graphql.Parent() parent: State,
    @graphql.Args() args: FindManyReminderArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Reminder[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Reminder",
    });
    const results = await this.service.findReminder(parent.id, args);
    return results.map((result) => permission.filter(result));
  }
}
