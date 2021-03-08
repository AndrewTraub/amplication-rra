import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../../auth/basicAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { LogTextService } from "../logText.service";
import { LogTextCreateInput } from "./LogTextCreateInput";
import { LogTextWhereInput } from "./LogTextWhereInput";
import { LogTextWhereUniqueInput } from "./LogTextWhereUniqueInput";
import { LogTextUpdateInput } from "./LogTextUpdateInput";
import { LogText } from "./LogText";

export class LogTextControllerBase {
  constructor(
    protected readonly service: LogTextService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "LogText",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: LogText })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Query() query: {},
    @common.Body() data: LogTextCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<LogText> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "LogText",
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
        `providing the properties: ${properties} on ${"LogText"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...query,
      data: {
        ...data,

        notification: data.notification
          ? {
              connect: data.notification,
            }
          : undefined,

        registration: data.registration
          ? {
              connect: data.registration,
            }
          : undefined,

        user: data.user
          ? {
              connect: data.user,
            }
          : undefined,
      },
      select: {
        createdAt: true,
        id: true,
        message: true,

        notification: {
          select: {
            id: true,
          },
        },

        registration: {
          select: {
            id: true,
          },
        },

        response: true,
        sent: true,
        sentBy: true,
        sentToNumber: true,
        smsTriggerReason: true,
        updatedAt: true,

        user: {
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
    resource: "LogText",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [LogText] })
  @swagger.ApiForbiddenResponse()
  async findMany(
    @common.Query() query: LogTextWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<LogText[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "LogText",
    });
    const results = await this.service.findMany({
      where: query,
      select: {
        createdAt: true,
        id: true,
        message: true,

        notification: {
          select: {
            id: true,
          },
        },

        registration: {
          select: {
            id: true,
          },
        },

        response: true,
        sent: true,
        sentBy: true,
        sentToNumber: true,
        smsTriggerReason: true,
        updatedAt: true,

        user: {
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
    resource: "LogText",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: LogText })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Query() query: {},
    @common.Param() params: LogTextWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<LogText | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "LogText",
    });
    const result = await this.service.findOne({
      ...query,
      where: params,
      select: {
        createdAt: true,
        id: true,
        message: true,

        notification: {
          select: {
            id: true,
          },
        },

        registration: {
          select: {
            id: true,
          },
        },

        response: true,
        sent: true,
        sentBy: true,
        sentToNumber: true,
        smsTriggerReason: true,
        updatedAt: true,

        user: {
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
    resource: "LogText",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: LogText })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Query() query: {},
    @common.Param() params: LogTextWhereUniqueInput,
    @common.Body()
    data: LogTextUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<LogText | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "LogText",
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
        `providing the properties: ${properties} on ${"LogText"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...query,
        where: params,
        data: {
          ...data,

          notification: data.notification
            ? {
                connect: data.notification,
              }
            : undefined,

          registration: data.registration
            ? {
                connect: data.registration,
              }
            : undefined,

          user: data.user
            ? {
                connect: data.user,
              }
            : undefined,
        },
        select: {
          createdAt: true,
          id: true,
          message: true,

          notification: {
            select: {
              id: true,
            },
          },

          registration: {
            select: {
              id: true,
            },
          },

          response: true,
          sent: true,
          sentBy: true,
          sentToNumber: true,
          smsTriggerReason: true,
          updatedAt: true,

          user: {
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
    resource: "LogText",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: LogText })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Query() query: {},
    @common.Param() params: LogTextWhereUniqueInput
  ): Promise<LogText | null> {
    try {
      return await this.service.delete({
        ...query,
        where: params,
        select: {
          createdAt: true,
          id: true,
          message: true,

          notification: {
            select: {
              id: true,
            },
          },

          registration: {
            select: {
              id: true,
            },
          },

          response: true,
          sent: true,
          sentBy: true,
          sentToNumber: true,
          smsTriggerReason: true,
          updatedAt: true,

          user: {
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
