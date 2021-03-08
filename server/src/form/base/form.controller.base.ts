import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../../auth/basicAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { FormService } from "../form.service";
import { FormCreateInput } from "./FormCreateInput";
import { FormWhereInput } from "./FormWhereInput";
import { FormWhereUniqueInput } from "./FormWhereUniqueInput";
import { FormUpdateInput } from "./FormUpdateInput";
import { Form } from "./Form";

export class FormControllerBase {
  constructor(
    protected readonly service: FormService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Form",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Form })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Query() query: {},
    @common.Body() data: FormCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Form> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Form",
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
        `providing the properties: ${properties} on ${"Form"} creation is forbidden for roles: ${roles}`
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
        createdAt: true,
        id: true,
        mustAcceptRisk: true,
        privateDescription: true,
        provatefilename: true,
        public: true,
        publicDescription: true,
        publicName: true,

        state: {
          select: {
            id: true,
          },
        },

        updatedAt: true,
        useRegistrationDate: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Form",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Form] })
  @swagger.ApiForbiddenResponse()
  async findMany(
    @common.Query() query: FormWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Form[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Form",
    });
    const results = await this.service.findMany({
      where: query,
      select: {
        createdAt: true,
        id: true,
        mustAcceptRisk: true,
        privateDescription: true,
        provatefilename: true,
        public: true,
        publicDescription: true,
        publicName: true,

        state: {
          select: {
            id: true,
          },
        },

        updatedAt: true,
        useRegistrationDate: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "Form",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Form })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Query() query: {},
    @common.Param() params: FormWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Form | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Form",
    });
    const result = await this.service.findOne({
      ...query,
      where: params,
      select: {
        createdAt: true,
        id: true,
        mustAcceptRisk: true,
        privateDescription: true,
        provatefilename: true,
        public: true,
        publicDescription: true,
        publicName: true,

        state: {
          select: {
            id: true,
          },
        },

        updatedAt: true,
        useRegistrationDate: true,
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
    resource: "Form",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Form })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Query() query: {},
    @common.Param() params: FormWhereUniqueInput,
    @common.Body()
    data: FormUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Form | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Form",
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
        `providing the properties: ${properties} on ${"Form"} update is forbidden for roles: ${roles}`
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
          createdAt: true,
          id: true,
          mustAcceptRisk: true,
          privateDescription: true,
          provatefilename: true,
          public: true,
          publicDescription: true,
          publicName: true,

          state: {
            select: {
              id: true,
            },
          },

          updatedAt: true,
          useRegistrationDate: true,
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
    resource: "Form",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Form })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Query() query: {},
    @common.Param() params: FormWhereUniqueInput
  ): Promise<Form | null> {
    try {
      return await this.service.delete({
        ...query,
        where: params,
        select: {
          createdAt: true,
          id: true,
          mustAcceptRisk: true,
          privateDescription: true,
          provatefilename: true,
          public: true,
          publicDescription: true,
          publicName: true,

          state: {
            select: {
              id: true,
            },
          },

          updatedAt: true,
          useRegistrationDate: true,
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
