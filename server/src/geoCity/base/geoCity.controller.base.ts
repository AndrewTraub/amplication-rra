import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../../auth/basicAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { GeoCityService } from "../geoCity.service";
import { GeoCityCreateInput } from "./GeoCityCreateInput";
import { GeoCityWhereInput } from "./GeoCityWhereInput";
import { GeoCityWhereUniqueInput } from "./GeoCityWhereUniqueInput";
import { GeoCityUpdateInput } from "./GeoCityUpdateInput";
import { GeoCity } from "./GeoCity";

export class GeoCityControllerBase {
  constructor(
    protected readonly service: GeoCityService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "GeoCity",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: GeoCity })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Query() query: {},
    @common.Body() data: GeoCityCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<GeoCity> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "GeoCity",
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
        `providing the properties: ${properties} on ${"GeoCity"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...query,
      data: {
        ...data,

        country: {
          connect: data.country,
        },

        state: {
          connect: data.state,
        },
      },
      select: {
        country: {
          select: {
            id: true,
          },
        },

        id: true,
        latitude: true,
        longitude: true,
        name: true,

        state: {
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
    resource: "GeoCity",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [GeoCity] })
  @swagger.ApiForbiddenResponse()
  async findMany(
    @common.Query() query: GeoCityWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<GeoCity[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "GeoCity",
    });
    const results = await this.service.findMany({
      where: query,
      select: {
        country: {
          select: {
            id: true,
          },
        },

        id: true,
        latitude: true,
        longitude: true,
        name: true,

        state: {
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
    resource: "GeoCity",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: GeoCity })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Query() query: {},
    @common.Param() params: GeoCityWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<GeoCity | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "GeoCity",
    });
    const result = await this.service.findOne({
      ...query,
      where: params,
      select: {
        country: {
          select: {
            id: true,
          },
        },

        id: true,
        latitude: true,
        longitude: true,
        name: true,

        state: {
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
    resource: "GeoCity",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: GeoCity })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Query() query: {},
    @common.Param() params: GeoCityWhereUniqueInput,
    @common.Body()
    data: GeoCityUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<GeoCity | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "GeoCity",
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
        `providing the properties: ${properties} on ${"GeoCity"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...query,
        where: params,
        data: {
          ...data,

          country: {
            connect: data.country,
          },

          state: {
            connect: data.state,
          },
        },
        select: {
          country: {
            select: {
              id: true,
            },
          },

          id: true,
          latitude: true,
          longitude: true,
          name: true,

          state: {
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
    resource: "GeoCity",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: GeoCity })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Query() query: {},
    @common.Param() params: GeoCityWhereUniqueInput
  ): Promise<GeoCity | null> {
    try {
      return await this.service.delete({
        ...query,
        where: params,
        select: {
          country: {
            select: {
              id: true,
            },
          },

          id: true,
          latitude: true,
          longitude: true,
          name: true,

          state: {
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
