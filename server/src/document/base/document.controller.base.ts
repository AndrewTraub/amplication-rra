import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../../auth/basicAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { DocumentService } from "../document.service";
import { DocumentCreateInput } from "./DocumentCreateInput";
import { DocumentWhereInput } from "./DocumentWhereInput";
import { DocumentWhereUniqueInput } from "./DocumentWhereUniqueInput";
import { DocumentUpdateInput } from "./DocumentUpdateInput";
import { Document } from "./Document";

export class DocumentControllerBase {
  constructor(
    protected readonly service: DocumentService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Document",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Document })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Query() query: {},
    @common.Body() data: DocumentCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Document> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Document",
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
        `providing the properties: ${properties} on ${"Document"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...query,
      data: {
        ...data,

        registrationId: data.registrationId
          ? {
              connect: data.registrationId,
            }
          : undefined,

        uploadedBy: data.uploadedBy
          ? {
              connect: data.uploadedBy,
            }
          : undefined,

        userId: data.userId
          ? {
              connect: data.userId,
            }
          : undefined,
      },
      select: {
        createdAt: true,
        fileType: true,
        fileUrl: true,
        id: true,
        notes: true,

        registrationId: {
          select: {
            id: true,
          },
        },

        title: true,
        updatedAt: true,

        uploadedBy: {
          select: {
            id: true,
          },
        },

        userId: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Document",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Document] })
  @swagger.ApiForbiddenResponse()
  async findMany(
    @common.Query() query: DocumentWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Document[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Document",
    });
    const results = await this.service.findMany({
      where: query,
      select: {
        createdAt: true,
        fileType: true,
        fileUrl: true,
        id: true,
        notes: true,

        registrationId: {
          select: {
            id: true,
          },
        },

        title: true,
        updatedAt: true,

        uploadedBy: {
          select: {
            id: true,
          },
        },

        userId: {
          select: {
            id: true,
          },
        },
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "Document",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Document })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Query() query: {},
    @common.Param() params: DocumentWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Document | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Document",
    });
    const result = await this.service.findOne({
      ...query,
      where: params,
      select: {
        createdAt: true,
        fileType: true,
        fileUrl: true,
        id: true,
        notes: true,

        registrationId: {
          select: {
            id: true,
          },
        },

        title: true,
        updatedAt: true,

        uploadedBy: {
          select: {
            id: true,
          },
        },

        userId: {
          select: {
            id: true,
          },
        },
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
    resource: "Document",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Document })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Query() query: {},
    @common.Param() params: DocumentWhereUniqueInput,
    @common.Body()
    data: DocumentUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Document | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Document",
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
        `providing the properties: ${properties} on ${"Document"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...query,
        where: params,
        data: {
          ...data,

          registrationId: data.registrationId
            ? {
                connect: data.registrationId,
              }
            : undefined,

          uploadedBy: data.uploadedBy
            ? {
                connect: data.uploadedBy,
              }
            : undefined,

          userId: data.userId
            ? {
                connect: data.userId,
              }
            : undefined,
        },
        select: {
          createdAt: true,
          fileType: true,
          fileUrl: true,
          id: true,
          notes: true,

          registrationId: {
            select: {
              id: true,
            },
          },

          title: true,
          updatedAt: true,

          uploadedBy: {
            select: {
              id: true,
            },
          },

          userId: {
            select: {
              id: true,
            },
          },
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
    resource: "Document",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Document })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Query() query: {},
    @common.Param() params: DocumentWhereUniqueInput
  ): Promise<Document | null> {
    try {
      return await this.service.delete({
        ...query,
        where: params,
        select: {
          createdAt: true,
          fileType: true,
          fileUrl: true,
          id: true,
          notes: true,

          registrationId: {
            select: {
              id: true,
            },
          },

          title: true,
          updatedAt: true,

          uploadedBy: {
            select: {
              id: true,
            },
          },

          userId: {
            select: {
              id: true,
            },
          },
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
