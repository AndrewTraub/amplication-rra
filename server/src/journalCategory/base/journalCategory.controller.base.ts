import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../../auth/basicAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { JournalCategoryService } from "../journalCategory.service";
import { JournalCategoryCreateInput } from "./JournalCategoryCreateInput";
import { JournalCategoryWhereInput } from "./JournalCategoryWhereInput";
import { JournalCategoryWhereUniqueInput } from "./JournalCategoryWhereUniqueInput";
import { JournalCategoryUpdateInput } from "./JournalCategoryUpdateInput";
import { JournalCategory } from "./JournalCategory";
import { JournalWhereInput } from "../../journal/base/JournalWhereInput";
import { Journal } from "../../journal/base/Journal";

export class JournalCategoryControllerBase {
  constructor(
    protected readonly service: JournalCategoryService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "JournalCategory",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: JournalCategory })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Query() query: {},
    @common.Body() data: JournalCategoryCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<JournalCategory> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "JournalCategory",
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
        `providing the properties: ${properties} on ${"JournalCategory"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...query,
      data: data,
      select: {
        createdAt: true,
        id: true,
        incomeorexpense: true,
        name: true,
        sort: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "JournalCategory",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [JournalCategory] })
  @swagger.ApiForbiddenResponse()
  async findMany(
    @common.Query() query: JournalCategoryWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<JournalCategory[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "JournalCategory",
    });
    const results = await this.service.findMany({
      where: query,
      select: {
        createdAt: true,
        id: true,
        incomeorexpense: true,
        name: true,
        sort: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "JournalCategory",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: JournalCategory })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Query() query: {},
    @common.Param() params: JournalCategoryWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<JournalCategory | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "JournalCategory",
    });
    const result = await this.service.findOne({
      ...query,
      where: params,
      select: {
        createdAt: true,
        id: true,
        incomeorexpense: true,
        name: true,
        sort: true,
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
    resource: "JournalCategory",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: JournalCategory })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Query() query: {},
    @common.Param() params: JournalCategoryWhereUniqueInput,
    @common.Body()
    data: JournalCategoryUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<JournalCategory | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "JournalCategory",
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
        `providing the properties: ${properties} on ${"JournalCategory"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...query,
        where: params,
        data: data,
        select: {
          createdAt: true,
          id: true,
          incomeorexpense: true,
          name: true,
          sort: true,
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
    resource: "JournalCategory",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: JournalCategory })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Query() query: {},
    @common.Param() params: JournalCategoryWhereUniqueInput
  ): Promise<JournalCategory | null> {
    try {
      return await this.service.delete({
        ...query,
        where: params,
        select: {
          createdAt: true,
          id: true,
          incomeorexpense: true,
          name: true,
          sort: true,
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
  @common.Get("/:id/journal")
  @nestAccessControl.UseRoles({
    resource: "JournalCategory",
    action: "read",
    possession: "any",
  })
  async findManyJournal(
    @common.Param() params: JournalCategoryWhereUniqueInput,
    @common.Query() query: JournalWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Journal[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Journal",
    });
    const results = await this.service.findJournal(params.id, {
      where: query,
      select: {
        account: {
          select: {
            id: true,
          },
        },

        agent: {
          select: {
            id: true,
          },
        },

        amount: true,

        category: {
          select: {
            id: true,
          },
        },

        comment: true,
        createdAt: true,
        dc: true,
        description: true,
        id: true,
        journaltype: true,
        postDate: true,
        posted: true,

        registration: {
          select: {
            id: true,
          },
        },

        source: true,
        transactionDate: true,
        transactionId: true,
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
  @common.Post("/:id/journal")
  @nestAccessControl.UseRoles({
    resource: "JournalCategory",
    action: "update",
    possession: "any",
  })
  async createJournal(
    @common.Param() params: JournalCategoryWhereUniqueInput,
    @common.Body() body: JournalCategoryWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      journal: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "JournalCategory",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"JournalCategory"} is forbidden for roles: ${roles}`
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
  @common.Patch("/:id/journal")
  @nestAccessControl.UseRoles({
    resource: "JournalCategory",
    action: "update",
    possession: "any",
  })
  async updateJournal(
    @common.Param() params: JournalCategoryWhereUniqueInput,
    @common.Body() body: JournalCategoryWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      journal: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "JournalCategory",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"JournalCategory"} is forbidden for roles: ${roles}`
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
  @common.Delete("/:id/journal")
  @nestAccessControl.UseRoles({
    resource: "JournalCategory",
    action: "update",
    possession: "any",
  })
  async deleteJournal(
    @common.Param() params: JournalCategoryWhereUniqueInput,
    @common.Body() body: JournalCategoryWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      journal: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "JournalCategory",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"JournalCategory"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }
}
