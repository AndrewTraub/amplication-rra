import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreatePdfFormArgs } from "./CreatePdfFormArgs";
import { UpdatePdfFormArgs } from "./UpdatePdfFormArgs";
import { DeletePdfFormArgs } from "./DeletePdfFormArgs";
import { FindManyPdfFormArgs } from "./FindManyPdfFormArgs";
import { FindOnePdfFormArgs } from "./FindOnePdfFormArgs";
import { PdfForm } from "./PdfForm";
import { State } from "../../state/base/State";
import { PdfFormService } from "../pdfForm.service";

@graphql.Resolver(() => PdfForm)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class PdfFormResolverBase {
  constructor(
    protected readonly service: PdfFormService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [PdfForm])
  @nestAccessControl.UseRoles({
    resource: "PdfForm",
    action: "read",
    possession: "any",
  })
  async pdfForms(
    @graphql.Args() args: FindManyPdfFormArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<PdfForm[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "PdfForm",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => PdfForm, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "PdfForm",
    action: "read",
    possession: "own",
  })
  async pdfForm(
    @graphql.Args() args: FindOnePdfFormArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<PdfForm | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "PdfForm",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => PdfForm)
  @nestAccessControl.UseRoles({
    resource: "PdfForm",
    action: "create",
    possession: "any",
  })
  async createPdfForm(
    @graphql.Args() args: CreatePdfFormArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<PdfForm> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "PdfForm",
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
        `providing the properties: ${properties} on ${"PdfForm"} creation is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => PdfForm)
  @nestAccessControl.UseRoles({
    resource: "PdfForm",
    action: "update",
    possession: "any",
  })
  async updatePdfForm(
    @graphql.Args() args: UpdatePdfFormArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<PdfForm | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "PdfForm",
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
        `providing the properties: ${properties} on ${"PdfForm"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => PdfForm)
  @nestAccessControl.UseRoles({
    resource: "PdfForm",
    action: "delete",
    possession: "any",
  })
  async deletePdfForm(
    @graphql.Args() args: DeletePdfFormArgs
  ): Promise<PdfForm | null> {
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
    resource: "PdfForm",
    action: "read",
    possession: "any",
  })
  async state(
    @graphql.Parent() parent: PdfForm,
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
