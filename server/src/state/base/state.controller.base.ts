import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../../auth/basicAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { StateService } from "../state.service";
import { StateCreateInput } from "./StateCreateInput";
import { StateWhereInput } from "./StateWhereInput";
import { StateWhereUniqueInput } from "./StateWhereUniqueInput";
import { StateUpdateInput } from "./StateUpdateInput";
import { State } from "./State";
import { AgentWhereInput } from "../../agent/base/AgentWhereInput";
import { Agent } from "../../agent/base/Agent";
import { PdfFormWhereInput } from "../../pdfForm/base/PdfFormWhereInput";
import { PdfForm } from "../../pdfForm/base/PdfForm";
import { ReminderWhereInput } from "../../reminder/base/ReminderWhereInput";
import { Reminder } from "../../reminder/base/Reminder";

export class StateControllerBase {
  constructor(
    protected readonly service: StateService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "State",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: State })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Query() query: {},
    @common.Body() data: StateCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<State> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "State",
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
        `providing the properties: ${properties} on ${"State"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...query,
      data: data,
      select: {
        annualFee: true,
        autoFax: true,
        createdAt: true,
        id: true,
        sosFax: true,
        sosPhone: true,
        state: true,
        updatedAt: true,
        withdrawalFee: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "State",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [State] })
  @swagger.ApiForbiddenResponse()
  async findMany(
    @common.Query() query: StateWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<State[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "State",
    });
    const results = await this.service.findMany({
      where: query,
      select: {
        annualFee: true,
        autoFax: true,
        createdAt: true,
        id: true,
        sosFax: true,
        sosPhone: true,
        state: true,
        updatedAt: true,
        withdrawalFee: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "State",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: State })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Query() query: {},
    @common.Param() params: StateWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<State | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "State",
    });
    const result = await this.service.findOne({
      ...query,
      where: params,
      select: {
        annualFee: true,
        autoFax: true,
        createdAt: true,
        id: true,
        sosFax: true,
        sosPhone: true,
        state: true,
        updatedAt: true,
        withdrawalFee: true,
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
    resource: "State",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: State })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Query() query: {},
    @common.Param() params: StateWhereUniqueInput,
    @common.Body()
    data: StateUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<State | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "State",
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
        `providing the properties: ${properties} on ${"State"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...query,
        where: params,
        data: data,
        select: {
          annualFee: true,
          autoFax: true,
          createdAt: true,
          id: true,
          sosFax: true,
          sosPhone: true,
          state: true,
          updatedAt: true,
          withdrawalFee: true,
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
    resource: "State",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: State })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Query() query: {},
    @common.Param() params: StateWhereUniqueInput
  ): Promise<State | null> {
    try {
      return await this.service.delete({
        ...query,
        where: params,
        select: {
          annualFee: true,
          autoFax: true,
          createdAt: true,
          id: true,
          sosFax: true,
          sosPhone: true,
          state: true,
          updatedAt: true,
          withdrawalFee: true,
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
  @common.Get("/:id/agent")
  @nestAccessControl.UseRoles({
    resource: "State",
    action: "read",
    possession: "any",
  })
  async findManyAgent(
    @common.Param() params: StateWhereUniqueInput,
    @common.Query() query: AgentWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Agent[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Agent",
    });
    const results = await this.service.findAgent(params.id, {
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
  @common.Post("/:id/agent")
  @nestAccessControl.UseRoles({
    resource: "State",
    action: "update",
    possession: "any",
  })
  async createAgent(
    @common.Param() params: StateWhereUniqueInput,
    @common.Body() body: StateWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      agent: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "State",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"State"} is forbidden for roles: ${roles}`
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
  @common.Patch("/:id/agent")
  @nestAccessControl.UseRoles({
    resource: "State",
    action: "update",
    possession: "any",
  })
  async updateAgent(
    @common.Param() params: StateWhereUniqueInput,
    @common.Body() body: StateWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      agent: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "State",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"State"} is forbidden for roles: ${roles}`
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
  @common.Delete("/:id/agent")
  @nestAccessControl.UseRoles({
    resource: "State",
    action: "update",
    possession: "any",
  })
  async deleteAgent(
    @common.Param() params: StateWhereUniqueInput,
    @common.Body() body: StateWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      agent: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "State",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"State"} is forbidden for roles: ${roles}`
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
  @common.Get("/:id/form")
  @nestAccessControl.UseRoles({
    resource: "State",
    action: "read",
    possession: "any",
  })
  async findManyForm(
    @common.Param() params: StateWhereUniqueInput,
    @common.Query() query: PdfFormWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<PdfForm[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "PdfForm",
    });
    const results = await this.service.findForm(params.id, {
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
  @common.Post("/:id/form")
  @nestAccessControl.UseRoles({
    resource: "State",
    action: "update",
    possession: "any",
  })
  async createForm(
    @common.Param() params: StateWhereUniqueInput,
    @common.Body() body: StateWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      form: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "State",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"State"} is forbidden for roles: ${roles}`
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
  @common.Patch("/:id/form")
  @nestAccessControl.UseRoles({
    resource: "State",
    action: "update",
    possession: "any",
  })
  async updateForm(
    @common.Param() params: StateWhereUniqueInput,
    @common.Body() body: StateWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      form: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "State",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"State"} is forbidden for roles: ${roles}`
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
  @common.Delete("/:id/form")
  @nestAccessControl.UseRoles({
    resource: "State",
    action: "update",
    possession: "any",
  })
  async deleteForm(
    @common.Param() params: StateWhereUniqueInput,
    @common.Body() body: StateWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      form: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "State",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"State"} is forbidden for roles: ${roles}`
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
  @common.Get("/:id/reminder")
  @nestAccessControl.UseRoles({
    resource: "State",
    action: "read",
    possession: "any",
  })
  async findManyReminder(
    @common.Param() params: StateWhereUniqueInput,
    @common.Query() query: ReminderWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Reminder[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Reminder",
    });
    const results = await this.service.findReminder(params.id, {
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
  @common.Post("/:id/reminder")
  @nestAccessControl.UseRoles({
    resource: "State",
    action: "update",
    possession: "any",
  })
  async createReminder(
    @common.Param() params: StateWhereUniqueInput,
    @common.Body() body: StateWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      reminder: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "State",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"State"} is forbidden for roles: ${roles}`
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
  @common.Patch("/:id/reminder")
  @nestAccessControl.UseRoles({
    resource: "State",
    action: "update",
    possession: "any",
  })
  async updateReminder(
    @common.Param() params: StateWhereUniqueInput,
    @common.Body() body: StateWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      reminder: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "State",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"State"} is forbidden for roles: ${roles}`
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
  @common.Delete("/:id/reminder")
  @nestAccessControl.UseRoles({
    resource: "State",
    action: "update",
    possession: "any",
  })
  async deleteReminder(
    @common.Param() params: StateWhereUniqueInput,
    @common.Body() body: StateWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      reminder: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "State",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"State"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }
}
