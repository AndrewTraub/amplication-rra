import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../../auth/basicAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { LogEmailService } from "../logEmail.service";
import { LogEmailCreateInput } from "./LogEmailCreateInput";
import { LogEmailWhereInput } from "./LogEmailWhereInput";
import { LogEmailWhereUniqueInput } from "./LogEmailWhereUniqueInput";
import { LogEmailUpdateInput } from "./LogEmailUpdateInput";
import { LogEmail } from "./LogEmail";

export class LogEmailControllerBase {
  constructor(
    protected readonly service: LogEmailService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "LogEmail",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: LogEmail })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Query() query: {},
    @common.Body() data: LogEmailCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<LogEmail> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "LogEmail",
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
        `providing the properties: ${properties} on ${"LogEmail"} creation is forbidden for roles: ${roles}`
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
        emailEvent: true,
        emailTo: true,
        id: true,
        messageId: true,

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

        sentOn: true,
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
    resource: "LogEmail",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [LogEmail] })
  @swagger.ApiForbiddenResponse()
  async findMany(
    @common.Query() query: LogEmailWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<LogEmail[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "LogEmail",
    });
    const results = await this.service.findMany({
      where: query,
      select: {
        createdAt: true,
        emailEvent: true,
        emailTo: true,
        id: true,
        messageId: true,

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

        sentOn: true,
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
    resource: "LogEmail",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: LogEmail })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Query() query: {},
    @common.Param() params: LogEmailWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<LogEmail | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "LogEmail",
    });
    const result = await this.service.findOne({
      ...query,
      where: params,
      select: {
        createdAt: true,
        emailEvent: true,
        emailTo: true,
        id: true,
        messageId: true,

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

        sentOn: true,
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
    resource: "LogEmail",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: LogEmail })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Query() query: {},
    @common.Param() params: LogEmailWhereUniqueInput,
    @common.Body()
    data: LogEmailUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<LogEmail | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "LogEmail",
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
        `providing the properties: ${properties} on ${"LogEmail"} update is forbidden for roles: ${roles}`
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
          emailEvent: true,
          emailTo: true,
          id: true,
          messageId: true,

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

          sentOn: true,
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
    resource: "LogEmail",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: LogEmail })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Query() query: {},
    @common.Param() params: LogEmailWhereUniqueInput
  ): Promise<LogEmail | null> {
    try {
      return await this.service.delete({
        ...query,
        where: params,
        select: {
          createdAt: true,
          emailEvent: true,
          emailTo: true,
          id: true,
          messageId: true,

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

          sentOn: true,
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
