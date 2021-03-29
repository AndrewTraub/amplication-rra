import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../../auth/basicAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { AgentService } from "../agent.service";
import { AgentCreateInput } from "./AgentCreateInput";
import { AgentWhereInput } from "./AgentWhereInput";
import { AgentWhereUniqueInput } from "./AgentWhereUniqueInput";
import { AgentUpdateInput } from "./AgentUpdateInput";
import { Agent } from "./Agent";
import { DocumentWhereInput } from "../../document/base/DocumentWhereInput";
import { Document } from "../../document/base/Document";
import { JournalWhereInput } from "../../journal/base/JournalWhereInput";
import { Journal } from "../../journal/base/Journal";

export class AgentControllerBase {
  constructor(
    protected readonly service: AgentService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Agent",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Agent })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Query() query: {},
    @common.Body() data: AgentCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Agent> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Agent",
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
        `providing the properties: ${properties} on ${"Agent"} creation is forbidden for roles: ${roles}`
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

        user: {
          connect: data.user,
        },
      },
      select: {
        address: true,
        createdAt: true,
        endDate: true,
        fee: true,
        id: true,
        name: true,
        payTo: true,
        startDate: true,

        state: {
          select: {
            id: true,
          },
        },

        taxId: true,
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
    resource: "Agent",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Agent] })
  @swagger.ApiForbiddenResponse()
  async findMany(
    @common.Query() query: AgentWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Agent[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Agent",
    });
    const results = await this.service.findMany({
      where: query,
      select: {
        address: true,
        createdAt: true,
        endDate: true,
        fee: true,
        id: true,
        name: true,
        payTo: true,
        startDate: true,

        state: {
          select: {
            id: true,
          },
        },

        taxId: true,
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
    resource: "Agent",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Agent })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Query() query: {},
    @common.Param() params: AgentWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Agent | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Agent",
    });
    const result = await this.service.findOne({
      ...query,
      where: params,
      select: {
        address: true,
        createdAt: true,
        endDate: true,
        fee: true,
        id: true,
        name: true,
        payTo: true,
        startDate: true,

        state: {
          select: {
            id: true,
          },
        },

        taxId: true,
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
    resource: "Agent",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Agent })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Query() query: {},
    @common.Param() params: AgentWhereUniqueInput,
    @common.Body()
    data: AgentUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Agent | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Agent",
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
        `providing the properties: ${properties} on ${"Agent"} update is forbidden for roles: ${roles}`
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

          user: {
            connect: data.user,
          },
        },
        select: {
          address: true,
          createdAt: true,
          endDate: true,
          fee: true,
          id: true,
          name: true,
          payTo: true,
          startDate: true,

          state: {
            select: {
              id: true,
            },
          },

          taxId: true,
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
    resource: "Agent",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Agent })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Query() query: {},
    @common.Param() params: AgentWhereUniqueInput
  ): Promise<Agent | null> {
    try {
      return await this.service.delete({
        ...query,
        where: params,
        select: {
          address: true,
          createdAt: true,
          endDate: true,
          fee: true,
          id: true,
          name: true,
          payTo: true,
          startDate: true,

          state: {
            select: {
              id: true,
            },
          },

          taxId: true,
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
  @common.Get("/:id/document")
  @nestAccessControl.UseRoles({
    resource: "Agent",
    action: "read",
    possession: "any",
  })
  async findManyDocument(
    @common.Param() params: AgentWhereUniqueInput,
    @common.Query() query: DocumentWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Document[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Document",
    });
    const results = await this.service.findDocument(params.id, {
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
  @common.Post("/:id/document")
  @nestAccessControl.UseRoles({
    resource: "Agent",
    action: "update",
    possession: "any",
  })
  async createDocument(
    @common.Param() params: AgentWhereUniqueInput,
    @common.Body() body: AgentWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      document: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Agent",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Agent"} is forbidden for roles: ${roles}`
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
  @common.Patch("/:id/document")
  @nestAccessControl.UseRoles({
    resource: "Agent",
    action: "update",
    possession: "any",
  })
  async updateDocument(
    @common.Param() params: AgentWhereUniqueInput,
    @common.Body() body: AgentWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      document: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Agent",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Agent"} is forbidden for roles: ${roles}`
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
  @common.Delete("/:id/document")
  @nestAccessControl.UseRoles({
    resource: "Agent",
    action: "update",
    possession: "any",
  })
  async deleteDocument(
    @common.Param() params: AgentWhereUniqueInput,
    @common.Body() body: AgentWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      document: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Agent",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Agent"} is forbidden for roles: ${roles}`
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
  @common.Get("/:id/journal")
  @nestAccessControl.UseRoles({
    resource: "Agent",
    action: "read",
    possession: "any",
  })
  async findManyJournal(
    @common.Param() params: AgentWhereUniqueInput,
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
    resource: "Agent",
    action: "update",
    possession: "any",
  })
  async createJournal(
    @common.Param() params: AgentWhereUniqueInput,
    @common.Body() body: AgentWhereUniqueInput[],
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
      resource: "Agent",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Agent"} is forbidden for roles: ${roles}`
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
    resource: "Agent",
    action: "update",
    possession: "any",
  })
  async updateJournal(
    @common.Param() params: AgentWhereUniqueInput,
    @common.Body() body: AgentWhereUniqueInput[],
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
      resource: "Agent",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Agent"} is forbidden for roles: ${roles}`
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
    resource: "Agent",
    action: "update",
    possession: "any",
  })
  async deleteJournal(
    @common.Param() params: AgentWhereUniqueInput,
    @common.Body() body: AgentWhereUniqueInput[],
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
      resource: "Agent",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Agent"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }
}
