import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../../auth/basicAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { GeoCountryService } from "../geoCountry.service";
import { GeoCountryCreateInput } from "./GeoCountryCreateInput";
import { GeoCountryWhereInput } from "./GeoCountryWhereInput";
import { GeoCountryWhereUniqueInput } from "./GeoCountryWhereUniqueInput";
import { GeoCountryUpdateInput } from "./GeoCountryUpdateInput";
import { GeoCountry } from "./GeoCountry";
import { GeoCityWhereInput } from "../../geoCity/base/GeoCityWhereInput";
import { GeoCity } from "../../geoCity/base/GeoCity";
import { GeoStateWhereInput } from "../../geoState/base/GeoStateWhereInput";
import { GeoState } from "../../geoState/base/GeoState";

export class GeoCountryControllerBase {
  constructor(
    protected readonly service: GeoCountryService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "GeoCountry",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: GeoCountry })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Query() query: {},
    @common.Body() data: GeoCountryCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<GeoCountry> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "GeoCountry",
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
        `providing the properties: ${properties} on ${"GeoCountry"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...query,
      data: data,
      select: {
        id: true,
        latitude: true,
        longitude: true,
        name: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "GeoCountry",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [GeoCountry] })
  @swagger.ApiForbiddenResponse()
  async findMany(
    @common.Query() query: GeoCountryWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<GeoCountry[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "GeoCountry",
    });
    const results = await this.service.findMany({
      where: query,
      select: {
        id: true,
        latitude: true,
        longitude: true,
        name: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "GeoCountry",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: GeoCountry })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Query() query: {},
    @common.Param() params: GeoCountryWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<GeoCountry | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "GeoCountry",
    });
    const result = await this.service.findOne({
      ...query,
      where: params,
      select: {
        id: true,
        latitude: true,
        longitude: true,
        name: true,
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
    resource: "GeoCountry",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: GeoCountry })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Query() query: {},
    @common.Param() params: GeoCountryWhereUniqueInput,
    @common.Body()
    data: GeoCountryUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<GeoCountry | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "GeoCountry",
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
        `providing the properties: ${properties} on ${"GeoCountry"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...query,
        where: params,
        data: data,
        select: {
          id: true,
          latitude: true,
          longitude: true,
          name: true,
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
    resource: "GeoCountry",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: GeoCountry })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Query() query: {},
    @common.Param() params: GeoCountryWhereUniqueInput
  ): Promise<GeoCountry | null> {
    try {
      return await this.service.delete({
        ...query,
        where: params,
        select: {
          id: true,
          latitude: true,
          longitude: true,
          name: true,
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
  @common.Get("/:id/city")
  @nestAccessControl.UseRoles({
    resource: "GeoCountry",
    action: "read",
    possession: "any",
  })
  async findManyCity(
    @common.Param() params: GeoCountryWhereUniqueInput,
    @common.Query() query: GeoCityWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<GeoCity[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "GeoCity",
    });
    const results = await this.service.findOne({ where: params }).city({
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
  @common.Post("/:id/city")
  @nestAccessControl.UseRoles({
    resource: "GeoCountry",
    action: "update",
    possession: "any",
  })
  async createCity(
    @common.Param() params: GeoCountryWhereUniqueInput,
    @common.Body() body: GeoCountryWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      city: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "GeoCountry",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"GeoCountry"} is forbidden for roles: ${roles}`
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
  @common.Patch("/:id/city")
  @nestAccessControl.UseRoles({
    resource: "GeoCountry",
    action: "update",
    possession: "any",
  })
  async updateCity(
    @common.Param() params: GeoCountryWhereUniqueInput,
    @common.Body() body: GeoCountryWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      city: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "GeoCountry",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"GeoCountry"} is forbidden for roles: ${roles}`
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
  @common.Delete("/:id/city")
  @nestAccessControl.UseRoles({
    resource: "GeoCountry",
    action: "update",
    possession: "any",
  })
  async deleteCity(
    @common.Param() params: GeoCountryWhereUniqueInput,
    @common.Body() body: GeoCountryWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      city: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "GeoCountry",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"GeoCountry"} is forbidden for roles: ${roles}`
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
  @common.Get("/:id/state")
  @nestAccessControl.UseRoles({
    resource: "GeoCountry",
    action: "read",
    possession: "any",
  })
  async findManyState(
    @common.Param() params: GeoCountryWhereUniqueInput,
    @common.Query() query: GeoStateWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<GeoState[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "GeoState",
    });
    const results = await this.service.findOne({ where: params }).state({
      where: query,
      select: {
        country: {
          select: {
            id: true,
          },
        },

        id: true,
        name: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post("/:id/state")
  @nestAccessControl.UseRoles({
    resource: "GeoCountry",
    action: "update",
    possession: "any",
  })
  async createState(
    @common.Param() params: GeoCountryWhereUniqueInput,
    @common.Body() body: GeoCountryWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      state: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "GeoCountry",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"GeoCountry"} is forbidden for roles: ${roles}`
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
  @common.Patch("/:id/state")
  @nestAccessControl.UseRoles({
    resource: "GeoCountry",
    action: "update",
    possession: "any",
  })
  async updateState(
    @common.Param() params: GeoCountryWhereUniqueInput,
    @common.Body() body: GeoCountryWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      state: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "GeoCountry",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"GeoCountry"} is forbidden for roles: ${roles}`
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
  @common.Delete("/:id/state")
  @nestAccessControl.UseRoles({
    resource: "GeoCountry",
    action: "update",
    possession: "any",
  })
  async deleteState(
    @common.Param() params: GeoCountryWhereUniqueInput,
    @common.Body() body: GeoCountryWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      state: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "GeoCountry",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"GeoCountry"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }
}
