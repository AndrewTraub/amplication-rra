import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateEmailTemplateArgs } from "./CreateEmailTemplateArgs";
import { UpdateEmailTemplateArgs } from "./UpdateEmailTemplateArgs";
import { DeleteEmailTemplateArgs } from "./DeleteEmailTemplateArgs";
import { FindManyEmailTemplateArgs } from "./FindManyEmailTemplateArgs";
import { FindOneEmailTemplateArgs } from "./FindOneEmailTemplateArgs";
import { EmailTemplate } from "./EmailTemplate";
import { EmailList } from "../../emailList/base/EmailList";
import { EmailTemplateService } from "../emailTemplate.service";

@graphql.Resolver(() => EmailTemplate)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class EmailTemplateResolverBase {
  constructor(
    protected readonly service: EmailTemplateService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [EmailTemplate])
  @nestAccessControl.UseRoles({
    resource: "EmailTemplate",
    action: "read",
    possession: "any",
  })
  async emailTemplates(
    @graphql.Args() args: FindManyEmailTemplateArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<EmailTemplate[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "EmailTemplate",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => EmailTemplate, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "EmailTemplate",
    action: "read",
    possession: "own",
  })
  async emailTemplate(
    @graphql.Args() args: FindOneEmailTemplateArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<EmailTemplate | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "EmailTemplate",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => EmailTemplate)
  @nestAccessControl.UseRoles({
    resource: "EmailTemplate",
    action: "create",
    possession: "any",
  })
  async createEmailTemplate(
    @graphql.Args() args: CreateEmailTemplateArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<EmailTemplate> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "EmailTemplate",
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
        `providing the properties: ${properties} on ${"EmailTemplate"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        emailList: {
          connect: args.data.emailList,
        },
      },
    });
  }

  @graphql.Mutation(() => EmailTemplate)
  @nestAccessControl.UseRoles({
    resource: "EmailTemplate",
    action: "update",
    possession: "any",
  })
  async updateEmailTemplate(
    @graphql.Args() args: UpdateEmailTemplateArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<EmailTemplate | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "EmailTemplate",
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
        `providing the properties: ${properties} on ${"EmailTemplate"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          emailList: {
            connect: args.data.emailList,
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

  @graphql.Mutation(() => EmailTemplate)
  @nestAccessControl.UseRoles({
    resource: "EmailTemplate",
    action: "delete",
    possession: "any",
  })
  async deleteEmailTemplate(
    @graphql.Args() args: DeleteEmailTemplateArgs
  ): Promise<EmailTemplate | null> {
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

  @graphql.ResolveField(() => EmailList, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "EmailTemplate",
    action: "read",
    possession: "any",
  })
  async emailList(
    @graphql.Parent() parent: EmailTemplate,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<EmailList | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "EmailList",
    });
    const result = await this.service.getEmailList(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
