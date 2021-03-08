import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../../auth/basicAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { CompanyService } from "../company.service";
import { CompanyCreateInput } from "./CompanyCreateInput";
import { CompanyWhereInput } from "./CompanyWhereInput";
import { CompanyWhereUniqueInput } from "./CompanyWhereUniqueInput";
import { CompanyUpdateInput } from "./CompanyUpdateInput";
import { Company } from "./Company";
import { RegistrationWhereInput } from "../../registration/base/RegistrationWhereInput";
import { Registration } from "../../registration/base/Registration";

export class CompanyControllerBase {
  constructor(
    protected readonly service: CompanyService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Company",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Company })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Query() query: {},
    @common.Body() data: CompanyCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Company> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Company",
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
        `providing the properties: ${properties} on ${"Company"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...query,
      data: {
        ...data,

        userId: {
          connect: data.userId,
        },
      },
      select: {
        address: true,
        address2: true,
        city: true,
        country: true,
        createdAt: true,
        entityType: true,
        federalIdNumber: true,
        id: true,
        name: true,
        notes: true,
        raiUuid: true,
        state: true,
        updatedAt: true,

        userId: {
          select: {
            id: true,
          },
        },

        zip: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Company",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Company] })
  @swagger.ApiForbiddenResponse()
  async findMany(
    @common.Query() query: CompanyWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Company[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Company",
    });
    const results = await this.service.findMany({
      where: query,
      select: {
        address: true,
        address2: true,
        city: true,
        country: true,
        createdAt: true,
        entityType: true,
        federalIdNumber: true,
        id: true,
        name: true,
        notes: true,
        raiUuid: true,
        state: true,
        updatedAt: true,

        userId: {
          select: {
            id: true,
          },
        },

        zip: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "Company",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Company })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Query() query: {},
    @common.Param() params: CompanyWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Company | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Company",
    });
    const result = await this.service.findOne({
      ...query,
      where: params,
      select: {
        address: true,
        address2: true,
        city: true,
        country: true,
        createdAt: true,
        entityType: true,
        federalIdNumber: true,
        id: true,
        name: true,
        notes: true,
        raiUuid: true,
        state: true,
        updatedAt: true,

        userId: {
          select: {
            id: true,
          },
        },

        zip: true,
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
    resource: "Company",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Company })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Query() query: {},
    @common.Param() params: CompanyWhereUniqueInput,
    @common.Body()
    data: CompanyUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Company | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Company",
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
        `providing the properties: ${properties} on ${"Company"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...query,
        where: params,
        data: {
          ...data,

          userId: {
            connect: data.userId,
          },
        },
        select: {
          address: true,
          address2: true,
          city: true,
          country: true,
          createdAt: true,
          entityType: true,
          federalIdNumber: true,
          id: true,
          name: true,
          notes: true,
          raiUuid: true,
          state: true,
          updatedAt: true,

          userId: {
            select: {
              id: true,
            },
          },

          zip: true,
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
    resource: "Company",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Company })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Query() query: {},
    @common.Param() params: CompanyWhereUniqueInput
  ): Promise<Company | null> {
    try {
      return await this.service.delete({
        ...query,
        where: params,
        select: {
          address: true,
          address2: true,
          city: true,
          country: true,
          createdAt: true,
          entityType: true,
          federalIdNumber: true,
          id: true,
          name: true,
          notes: true,
          raiUuid: true,
          state: true,
          updatedAt: true,

          userId: {
            select: {
              id: true,
            },
          },

          zip: true,
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
  @common.Get("/:id/registration")
  @nestAccessControl.UseRoles({
    resource: "Company",
    action: "read",
    possession: "any",
  })
  async findManyRegistration(
    @common.Param() params: CompanyWhereUniqueInput,
    @common.Query() query: RegistrationWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Registration[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Registration",
    });
    const results = await this.service.findOne({ where: params }).registration({
      where: query,
      select: {
        automaticRenewal: true,
        cancelledDate: true,

        companyId: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        dba: true,
        exp: true,
        four: true,
        id: true,
        merchant: true,
        noGracePeriod: true,
        period: true,
        registeredDate: true,
        renewalDate: true,
        state: true,
        status: true,
        subscriptionId: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post("/:id/registration")
  @nestAccessControl.UseRoles({
    resource: "Company",
    action: "update",
    possession: "any",
  })
  async createRegistration(
    @common.Param() params: CompanyWhereUniqueInput,
    @common.Body() body: CompanyWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      registration: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Company",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Company"} is forbidden for roles: ${roles}`
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
  @common.Patch("/:id/registration")
  @nestAccessControl.UseRoles({
    resource: "Company",
    action: "update",
    possession: "any",
  })
  async updateRegistration(
    @common.Param() params: CompanyWhereUniqueInput,
    @common.Body() body: CompanyWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      registration: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Company",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Company"} is forbidden for roles: ${roles}`
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
  @common.Delete("/:id/registration")
  @nestAccessControl.UseRoles({
    resource: "Company",
    action: "update",
    possession: "any",
  })
  async deleteRegistration(
    @common.Param() params: CompanyWhereUniqueInput,
    @common.Body() body: CompanyWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      registration: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Company",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Company"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }
}
