import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateEmailListArgs } from "./CreateEmailListArgs";
import { UpdateEmailListArgs } from "./UpdateEmailListArgs";
import { DeleteEmailListArgs } from "./DeleteEmailListArgs";
import { FindManyEmailListArgs } from "./FindManyEmailListArgs";
import { FindOneEmailListArgs } from "./FindOneEmailListArgs";
import { EmailList } from "./EmailList";
import { FindManyEmailTemplateArgs } from "../../emailTemplate/base/FindManyEmailTemplateArgs";
import { EmailTemplate } from "../../emailTemplate/base/EmailTemplate";
import { EmailListService } from "../emailList.service";

@graphql.Resolver(() => EmailList)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class EmailListResolverBase {
  constructor(
    protected readonly service: EmailListService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [EmailList])
  @nestAccessControl.UseRoles({
    resource: "EmailList",
    action: "read",
    possession: "any",
  })
  async emailLists(
    @graphql.Args() args: FindManyEmailListArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<EmailList[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "EmailList",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => EmailList, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "EmailList",
    action: "read",
    possession: "own",
  })
  async emailList(
    @graphql.Args() args: FindOneEmailListArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<EmailList | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "EmailList",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => EmailList)
  @nestAccessControl.UseRoles({
    resource: "EmailList",
    action: "create",
    possession: "any",
  })
  async createEmailList(
    @graphql.Args() args: CreateEmailListArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<EmailList> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "EmailList",
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
        `providing the properties: ${properties} on ${"EmailList"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => EmailList)
  @nestAccessControl.UseRoles({
    resource: "EmailList",
    action: "update",
    possession: "any",
  })
  async updateEmailList(
    @graphql.Args() args: UpdateEmailListArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<EmailList | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "EmailList",
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
        `providing the properties: ${properties} on ${"EmailList"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => EmailList)
  @nestAccessControl.UseRoles({
    resource: "EmailList",
    action: "delete",
    possession: "any",
  })
  async deleteEmailList(
    @graphql.Args() args: DeleteEmailListArgs
  ): Promise<EmailList | null> {
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

  @graphql.ResolveField(() => [EmailTemplate])
  @nestAccessControl.UseRoles({
    resource: "EmailList",
    action: "read",
    possession: "any",
  })
  async template(
    @graphql.Parent() parent: EmailList,
    @graphql.Args() args: FindManyEmailTemplateArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<EmailTemplate[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "EmailTemplate",
    });
    const results = await this.service
      .findOne({ where: { id: parent.id } })
      // @ts-ignore
      .template(args);
    return results.map((result) => permission.filter(result));
  }
}
