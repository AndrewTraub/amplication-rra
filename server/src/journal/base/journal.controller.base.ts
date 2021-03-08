import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../../auth/basicAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { JournalService } from "../journal.service";
import { JournalCreateInput } from "./JournalCreateInput";
import { JournalWhereInput } from "./JournalWhereInput";
import { JournalWhereUniqueInput } from "./JournalWhereUniqueInput";
import { JournalUpdateInput } from "./JournalUpdateInput";
import { Journal } from "./Journal";

export class JournalControllerBase {
  constructor(
    protected readonly service: JournalService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Journal",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Journal })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Query() query: {},
    @common.Body() data: JournalCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Journal> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Journal",
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
        `providing the properties: ${properties} on ${"Journal"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...query,
      data: {
        ...data,

        account: {
          connect: data.account,
        },

        agent: data.agent
          ? {
              connect: data.agent,
            }
          : undefined,

        category: data.category
          ? {
              connect: data.category,
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
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Journal",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Journal] })
  @swagger.ApiForbiddenResponse()
  async findMany(
    @common.Query() query: JournalWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Journal[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Journal",
    });
    const results = await this.service.findMany({
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
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "Journal",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Journal })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Query() query: {},
    @common.Param() params: JournalWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Journal | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Journal",
    });
    const result = await this.service.findOne({
      ...query,
      where: params,
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
    resource: "Journal",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Journal })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Query() query: {},
    @common.Param() params: JournalWhereUniqueInput,
    @common.Body()
    data: JournalUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Journal | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Journal",
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
        `providing the properties: ${properties} on ${"Journal"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...query,
        where: params,
        data: {
          ...data,

          account: {
            connect: data.account,
          },

          agent: data.agent
            ? {
                connect: data.agent,
              }
            : undefined,

          category: data.category
            ? {
                connect: data.category,
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
    resource: "Journal",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Journal })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Query() query: {},
    @common.Param() params: JournalWhereUniqueInput
  ): Promise<Journal | null> {
    try {
      return await this.service.delete({
        ...query,
        where: params,
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
