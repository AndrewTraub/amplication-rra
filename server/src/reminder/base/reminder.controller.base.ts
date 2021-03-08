import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../../auth/basicAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { ReminderService } from "../reminder.service";
import { ReminderCreateInput } from "./ReminderCreateInput";
import { ReminderWhereInput } from "./ReminderWhereInput";
import { ReminderWhereUniqueInput } from "./ReminderWhereUniqueInput";
import { ReminderUpdateInput } from "./ReminderUpdateInput";
import { Reminder } from "./Reminder";

export class ReminderControllerBase {
  constructor(
    protected readonly service: ReminderService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Reminder",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Reminder })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Query() query: {},
    @common.Body() data: ReminderCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Reminder> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Reminder",
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
        `providing the properties: ${properties} on ${"Reminder"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...query,
      data: {
        ...data,

        state: {
          connect: data.state,
        },
      },
      select: {
        active: true,
        body: true,
        createdAt: true,
        day: true,
        id: true,
        month: true,

        state: {
          select: {
            id: true,
          },
        },

        title: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Reminder",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Reminder] })
  @swagger.ApiForbiddenResponse()
  async findMany(
    @common.Query() query: ReminderWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Reminder[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Reminder",
    });
    const results = await this.service.findMany({
      where: query,
      select: {
        active: true,
        body: true,
        createdAt: true,
        day: true,
        id: true,
        month: true,

        state: {
          select: {
            id: true,
          },
        },

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
    resource: "Reminder",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Reminder })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Query() query: {},
    @common.Param() params: ReminderWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Reminder | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Reminder",
    });
    const result = await this.service.findOne({
      ...query,
      where: params,
      select: {
        active: true,
        body: true,
        createdAt: true,
        day: true,
        id: true,
        month: true,

        state: {
          select: {
            id: true,
          },
        },

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
    resource: "Reminder",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Reminder })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Query() query: {},
    @common.Param() params: ReminderWhereUniqueInput,
    @common.Body()
    data: ReminderUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Reminder | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Reminder",
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
        `providing the properties: ${properties} on ${"Reminder"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...query,
        where: params,
        data: {
          ...data,

          state: {
            connect: data.state,
          },
        },
        select: {
          active: true,
          body: true,
          createdAt: true,
          day: true,
          id: true,
          month: true,

          state: {
            select: {
              id: true,
            },
          },

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
    resource: "Reminder",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Reminder })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Query() query: {},
    @common.Param() params: ReminderWhereUniqueInput
  ): Promise<Reminder | null> {
    try {
      return await this.service.delete({
        ...query,
        where: params,
        select: {
          active: true,
          body: true,
          createdAt: true,
          day: true,
          id: true,
          month: true,

          state: {
            select: {
              id: true,
            },
          },

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
