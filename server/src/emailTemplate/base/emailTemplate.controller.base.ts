import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../../auth/basicAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { EmailTemplateService } from "../emailTemplate.service";
import { EmailTemplateCreateInput } from "./EmailTemplateCreateInput";
import { EmailTemplateWhereInput } from "./EmailTemplateWhereInput";
import { EmailTemplateWhereUniqueInput } from "./EmailTemplateWhereUniqueInput";
import { EmailTemplateUpdateInput } from "./EmailTemplateUpdateInput";
import { EmailTemplate } from "./EmailTemplate";

export class EmailTemplateControllerBase {
  constructor(
    protected readonly service: EmailTemplateService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "EmailTemplate",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: EmailTemplate })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Query() query: {},
    @common.Body() data: EmailTemplateCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<EmailTemplate> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "EmailTemplate",
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
        `providing the properties: ${properties} on ${"EmailTemplate"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...query,
      data: {
        ...data,

        emailList: {
          connect: data.emailList,
        },
      },
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
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "EmailTemplate",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [EmailTemplate] })
  @swagger.ApiForbiddenResponse()
  async findMany(
    @common.Query() query: EmailTemplateWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<EmailTemplate[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "EmailTemplate",
    });
    const results = await this.service.findMany({
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
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "EmailTemplate",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: EmailTemplate })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Query() query: {},
    @common.Param() params: EmailTemplateWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<EmailTemplate | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "EmailTemplate",
    });
    const result = await this.service.findOne({
      ...query,
      where: params,
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
    resource: "EmailTemplate",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: EmailTemplate })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Query() query: {},
    @common.Param() params: EmailTemplateWhereUniqueInput,
    @common.Body()
    data: EmailTemplateUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<EmailTemplate | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "EmailTemplate",
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
        `providing the properties: ${properties} on ${"EmailTemplate"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...query,
        where: params,
        data: {
          ...data,

          emailList: {
            connect: data.emailList,
          },
        },
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
    resource: "EmailTemplate",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: EmailTemplate })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Query() query: {},
    @common.Param() params: EmailTemplateWhereUniqueInput
  ): Promise<EmailTemplate | null> {
    try {
      return await this.service.delete({
        ...query,
        where: params,
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
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }
}
