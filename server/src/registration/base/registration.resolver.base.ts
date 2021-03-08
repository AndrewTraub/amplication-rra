import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateRegistrationArgs } from "./CreateRegistrationArgs";
import { UpdateRegistrationArgs } from "./UpdateRegistrationArgs";
import { DeleteRegistrationArgs } from "./DeleteRegistrationArgs";
import { FindManyRegistrationArgs } from "./FindManyRegistrationArgs";
import { FindOneRegistrationArgs } from "./FindOneRegistrationArgs";
import { Registration } from "./Registration";
import { FindManyDocumentArgs } from "../../document/base/FindManyDocumentArgs";
import { Document } from "../../document/base/Document";
import { FindManyLogEmailArgs } from "../../logEmail/base/FindManyLogEmailArgs";
import { LogEmail } from "../../logEmail/base/LogEmail";
import { FindManyJournalArgs } from "../../journal/base/FindManyJournalArgs";
import { Journal } from "../../journal/base/Journal";
import { FindManyNotificationArgs } from "../../notification/base/FindManyNotificationArgs";
import { Notification } from "../../notification/base/Notification";
import { FindManyLogTextArgs } from "../../logText/base/FindManyLogTextArgs";
import { LogText } from "../../logText/base/LogText";
import { Company } from "../../company/base/Company";
import { RegistrationService } from "../registration.service";

@graphql.Resolver(() => Registration)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class RegistrationResolverBase {
  constructor(
    protected readonly service: RegistrationService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Registration])
  @nestAccessControl.UseRoles({
    resource: "Registration",
    action: "read",
    possession: "any",
  })
  async registrations(
    @graphql.Args() args: FindManyRegistrationArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Registration[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Registration",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Registration, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Registration",
    action: "read",
    possession: "own",
  })
  async registration(
    @graphql.Args() args: FindOneRegistrationArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Registration | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Registration",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Registration)
  @nestAccessControl.UseRoles({
    resource: "Registration",
    action: "create",
    possession: "any",
  })
  async createRegistration(
    @graphql.Args() args: CreateRegistrationArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Registration> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Registration",
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
        `providing the properties: ${properties} on ${"Registration"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        companyId: {
          connect: args.data.companyId,
        },
      },
    });
  }

  @graphql.Mutation(() => Registration)
  @nestAccessControl.UseRoles({
    resource: "Registration",
    action: "update",
    possession: "any",
  })
  async updateRegistration(
    @graphql.Args() args: UpdateRegistrationArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Registration | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Registration",
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
        `providing the properties: ${properties} on ${"Registration"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          companyId: {
            connect: args.data.companyId,
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

  @graphql.Mutation(() => Registration)
  @nestAccessControl.UseRoles({
    resource: "Registration",
    action: "delete",
    possession: "any",
  })
  async deleteRegistration(
    @graphql.Args() args: DeleteRegistrationArgs
  ): Promise<Registration | null> {
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
    resource: "Registration",
    action: "read",
    possession: "any",
  })
  async document(
    @graphql.Parent() parent: Registration,
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

  @graphql.ResolveField(() => [LogEmail])
  @nestAccessControl.UseRoles({
    resource: "Registration",
    action: "read",
    possession: "any",
  })
  async emailLog(
    @graphql.Parent() parent: Registration,
    @graphql.Args() args: FindManyLogEmailArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<LogEmail[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "LogEmail",
    });
    const results = await this.service
      .findOne({ where: { id: parent.id } })
      // @ts-ignore
      .emailLog(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [Journal])
  @nestAccessControl.UseRoles({
    resource: "Registration",
    action: "read",
    possession: "any",
  })
  async journal(
    @graphql.Parent() parent: Registration,
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

  @graphql.ResolveField(() => [Notification])
  @nestAccessControl.UseRoles({
    resource: "Registration",
    action: "read",
    possession: "any",
  })
  async notification(
    @graphql.Parent() parent: Registration,
    @graphql.Args() args: FindManyNotificationArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Notification[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Notification",
    });
    const results = await this.service
      .findOne({ where: { id: parent.id } })
      // @ts-ignore
      .notification(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [LogText])
  @nestAccessControl.UseRoles({
    resource: "Registration",
    action: "read",
    possession: "any",
  })
  async smsLog(
    @graphql.Parent() parent: Registration,
    @graphql.Args() args: FindManyLogTextArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<LogText[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "LogText",
    });
    const results = await this.service
      .findOne({ where: { id: parent.id } })
      // @ts-ignore
      .smsLog(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => Company, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Registration",
    action: "read",
    possession: "any",
  })
  async companyId(
    @graphql.Parent() parent: Registration,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Company | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Company",
    });
    const result = await this.service
      .findOne({ where: { id: parent.id } })
      .companyId();

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
