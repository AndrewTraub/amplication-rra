import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../../auth/basicAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { EmailListService } from "../emailList.service";
import { EmailListCreateInput } from "./EmailListCreateInput";
import { EmailListWhereInput } from "./EmailListWhereInput";
import { EmailListWhereUniqueInput } from "./EmailListWhereUniqueInput";
import { EmailListUpdateInput } from "./EmailListUpdateInput";
import { EmailList } from "./EmailList";
import { EmailTemplateWhereInput } from "../../emailTemplate/base/EmailTemplateWhereInput";
import { EmailTemplate } from "../../emailTemplate/base/EmailTemplate";

export class EmailListControllerBase {
  constructor(
    protected readonly service: EmailListService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "EmailList",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: EmailList })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Query() query: {},
    @common.Body() data: EmailListCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<EmailList> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "EmailList",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"EmailList"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...query,
      data: data,
      select: {
        active: true,
        createdAt: true,
        description: true,
        id: true,
        name: true,
        stage: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "EmailList",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [EmailList] })
  @swagger.ApiForbiddenResponse()
  async findMany(
    @common.Query() query: EmailListWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<EmailList[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "EmailList",
    });
    const results = await this.service.findMany({
      where: query,
      select: {
        active: true,
        createdAt: true,
        description: true,
        id: true,
        name: true,
        stage: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "EmailList",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: EmailList })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Query() query: {},
    @common.Param() params: EmailListWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<EmailList | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "EmailList",
    });
    const result = await this.service.findOne({
      ...query,
      where: params,
      select: {
        active: true,
        createdAt: true,
        description: true,
        id: true,
        name: true,
        stage: true,
        updatedAt: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return permission.filter(result);
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Patch("/:id")
  @nestAccessControl.UseRoles({
    resource: "EmailList",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: EmailList })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Query() query: {},
    @common.Param() params: EmailListWhereUniqueInput,
    @common.Body()
    data: EmailListUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<EmailList | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "EmailList",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"EmailList"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...query,
        where: params,
        data: data,
        select: {
          active: true,
          createdAt: true,
          description: true,
          id: true,
          name: true,
          stage: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Delete("/:id")
  @nestAccessControl.UseRoles({
    resource: "EmailList",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: EmailList })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Query() query: {},
    @common.Param() params: EmailListWhereUniqueInput
  ): Promise<EmailList | null> {
    try {
      return await this.service.delete({
        ...query,
        where: params,
        select: {
          active: true,
          createdAt: true,
          description: true,
          id: true,
          name: true,
          stage: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id/template")
  @nestAccessControl.UseRoles({
    resource: "EmailList",
    action: "read",
    possession: "any",
  })
  async findManyTemplate(
    @common.Param() params: EmailListWhereUniqueInput,
    @common.Query() query: EmailTemplateWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<EmailTemplate[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "EmailTemplate",
    });
    const results = await this.service.findTemplate(params.id, {
      where: query,
      select: {
        active: true,
        body: true,
        createdAt: true,
        delay: true,

        emailList: {
          select: {
            id: true,
          },
        },

        id: true,
        sequenceNumber: true,
        title: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post("/:id/template")
  @nestAccessControl.UseRoles({
    resource: "EmailList",
    action: "update",
    possession: "any",
  })
  async createTemplate(
    @common.Param() params: EmailListWhereUniqueInput,
    @common.Body() body: EmailListWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      template: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "EmailList",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"EmailList"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Patch("/:id/template")
  @nestAccessControl.UseRoles({
    resource: "EmailList",
    action: "update",
    possession: "any",
  })
  async updateTemplate(
    @common.Param() params: EmailListWhereUniqueInput,
    @common.Body() body: EmailListWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      template: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "EmailList",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"EmailList"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Delete("/:id/template")
  @nestAccessControl.UseRoles({
    resource: "EmailList",
    action: "update",
    possession: "any",
  })
  async deleteTemplate(
    @common.Param() params: EmailListWhereUniqueInput,
    @common.Body() body: EmailListWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      template: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "EmailList",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"EmailList"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }
}
