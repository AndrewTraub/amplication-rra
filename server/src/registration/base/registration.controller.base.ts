import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../../auth/basicAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { RegistrationService } from "../registration.service";
import { RegistrationCreateInput } from "./RegistrationCreateInput";
import { RegistrationWhereInput } from "./RegistrationWhereInput";
import { RegistrationWhereUniqueInput } from "./RegistrationWhereUniqueInput";
import { RegistrationUpdateInput } from "./RegistrationUpdateInput";
import { Registration } from "./Registration";
import { DocumentWhereInput } from "../../document/base/DocumentWhereInput";
import { Document } from "../../document/base/Document";
import { LogEmailWhereInput } from "../../logEmail/base/LogEmailWhereInput";
import { LogEmail } from "../../logEmail/base/LogEmail";
import { JournalWhereInput } from "../../journal/base/JournalWhereInput";
import { Journal } from "../../journal/base/Journal";
import { NotificationWhereInput } from "../../notification/base/NotificationWhereInput";
import { Notification } from "../../notification/base/Notification";
import { LogTextWhereInput } from "../../logText/base/LogTextWhereInput";
import { LogText } from "../../logText/base/LogText";

export class RegistrationControllerBase {
  constructor(
    protected readonly service: RegistrationService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Registration",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Registration })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Query() query: {},
    @common.Body() data: RegistrationCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Registration> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Registration",
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
        `providing the properties: ${properties} on ${"Registration"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...query,
      data: {
        ...data,

        companyId: {
          connect: data.companyId,
        },
      },
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
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Registration",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Registration] })
  @swagger.ApiForbiddenResponse()
  async findMany(
    @common.Query() query: RegistrationWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Registration[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Registration",
    });
    const results = await this.service.findMany({
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
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "Registration",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Registration })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Query() query: {},
    @common.Param() params: RegistrationWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Registration | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Registration",
    });
    const result = await this.service.findOne({
      ...query,
      where: params,
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
    resource: "Registration",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Registration })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Query() query: {},
    @common.Param() params: RegistrationWhereUniqueInput,
    @common.Body()
    data: RegistrationUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Registration | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Registration",
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
        `providing the properties: ${properties} on ${"Registration"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...query,
        where: params,
        data: {
          ...data,

          companyId: {
            connect: data.companyId,
          },
        },
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
    resource: "Registration",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Registration })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Query() query: {},
    @common.Param() params: RegistrationWhereUniqueInput
  ): Promise<Registration | null> {
    try {
      return await this.service.delete({
        ...query,
        where: params,
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
    resource: "Registration",
    action: "read",
    possession: "any",
  })
  async findManyDocument(
    @common.Param() params: RegistrationWhereUniqueInput,
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
    resource: "Registration",
    action: "update",
    possession: "any",
  })
  async createDocument(
    @common.Param() params: RegistrationWhereUniqueInput,
    @common.Body() body: RegistrationWhereUniqueInput[],
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
      resource: "Registration",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Registration"} is forbidden for roles: ${roles}`
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
    resource: "Registration",
    action: "update",
    possession: "any",
  })
  async updateDocument(
    @common.Param() params: RegistrationWhereUniqueInput,
    @common.Body() body: RegistrationWhereUniqueInput[],
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
      resource: "Registration",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Registration"} is forbidden for roles: ${roles}`
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
    resource: "Registration",
    action: "update",
    possession: "any",
  })
  async deleteDocument(
    @common.Param() params: RegistrationWhereUniqueInput,
    @common.Body() body: RegistrationWhereUniqueInput[],
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
      resource: "Registration",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Registration"} is forbidden for roles: ${roles}`
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
  @common.Get("/:id/emailLog")
  @nestAccessControl.UseRoles({
    resource: "Registration",
    action: "read",
    possession: "any",
  })
  async findManyEmailLog(
    @common.Param() params: RegistrationWhereUniqueInput,
    @common.Query() query: LogEmailWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<LogEmail[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "LogEmail",
    });
    const results = await this.service.findEmailLog(params.id, {
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
  @common.Post("/:id/emailLog")
  @nestAccessControl.UseRoles({
    resource: "Registration",
    action: "update",
    possession: "any",
  })
  async createEmailLog(
    @common.Param() params: RegistrationWhereUniqueInput,
    @common.Body() body: RegistrationWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      emailLog: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Registration",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Registration"} is forbidden for roles: ${roles}`
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
  @common.Patch("/:id/emailLog")
  @nestAccessControl.UseRoles({
    resource: "Registration",
    action: "update",
    possession: "any",
  })
  async updateEmailLog(
    @common.Param() params: RegistrationWhereUniqueInput,
    @common.Body() body: RegistrationWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      emailLog: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Registration",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Registration"} is forbidden for roles: ${roles}`
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
  @common.Delete("/:id/emailLog")
  @nestAccessControl.UseRoles({
    resource: "Registration",
    action: "update",
    possession: "any",
  })
  async deleteEmailLog(
    @common.Param() params: RegistrationWhereUniqueInput,
    @common.Body() body: RegistrationWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      emailLog: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Registration",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Registration"} is forbidden for roles: ${roles}`
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
    resource: "Registration",
    action: "read",
    possession: "any",
  })
  async findManyJournal(
    @common.Param() params: RegistrationWhereUniqueInput,
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
    resource: "Registration",
    action: "update",
    possession: "any",
  })
  async createJournal(
    @common.Param() params: RegistrationWhereUniqueInput,
    @common.Body() body: RegistrationWhereUniqueInput[],
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
      resource: "Registration",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Registration"} is forbidden for roles: ${roles}`
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
    resource: "Registration",
    action: "update",
    possession: "any",
  })
  async updateJournal(
    @common.Param() params: RegistrationWhereUniqueInput,
    @common.Body() body: RegistrationWhereUniqueInput[],
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
      resource: "Registration",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Registration"} is forbidden for roles: ${roles}`
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
    resource: "Registration",
    action: "update",
    possession: "any",
  })
  async deleteJournal(
    @common.Param() params: RegistrationWhereUniqueInput,
    @common.Body() body: RegistrationWhereUniqueInput[],
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
      resource: "Registration",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Registration"} is forbidden for roles: ${roles}`
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
  @common.Get("/:id/notification")
  @nestAccessControl.UseRoles({
    resource: "Registration",
    action: "read",
    possession: "any",
  })
  async findManyNotification(
    @common.Param() params: RegistrationWhereUniqueInput,
    @common.Query() query: NotificationWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Notification[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Notification",
    });
    const results = await this.service.findNotification(params.id, {
      where: query,
      select: {
        createdAt: true,
        disabled: true,
        email: true,
        fax: true,
        id: true,
        phone: true,

        registrationId: {
          select: {
            id: true,
          },
        },

        sendFax: true,
        sendSms: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post("/:id/notification")
  @nestAccessControl.UseRoles({
    resource: "Registration",
    action: "update",
    possession: "any",
  })
  async createNotification(
    @common.Param() params: RegistrationWhereUniqueInput,
    @common.Body() body: RegistrationWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      notification: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Registration",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Registration"} is forbidden for roles: ${roles}`
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
  @common.Patch("/:id/notification")
  @nestAccessControl.UseRoles({
    resource: "Registration",
    action: "update",
    possession: "any",
  })
  async updateNotification(
    @common.Param() params: RegistrationWhereUniqueInput,
    @common.Body() body: RegistrationWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      notification: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Registration",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Registration"} is forbidden for roles: ${roles}`
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
  @common.Delete("/:id/notification")
  @nestAccessControl.UseRoles({
    resource: "Registration",
    action: "update",
    possession: "any",
  })
  async deleteNotification(
    @common.Param() params: RegistrationWhereUniqueInput,
    @common.Body() body: RegistrationWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      notification: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Registration",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Registration"} is forbidden for roles: ${roles}`
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
  @common.Get("/:id/smsLog")
  @nestAccessControl.UseRoles({
    resource: "Registration",
    action: "read",
    possession: "any",
  })
  async findManySmsLog(
    @common.Param() params: RegistrationWhereUniqueInput,
    @common.Query() query: LogTextWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<LogText[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "LogText",
    });
    const results = await this.service.findSmsLog(params.id, {
      where: query,
      select: {
        createdAt: true,
        id: true,
        message: true,

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

        response: true,
        sent: true,
        sentBy: true,
        sentToNumber: true,
        smsTriggerReason: true,
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
  @common.Post("/:id/smsLog")
  @nestAccessControl.UseRoles({
    resource: "Registration",
    action: "update",
    possession: "any",
  })
  async createSmsLog(
    @common.Param() params: RegistrationWhereUniqueInput,
    @common.Body() body: RegistrationWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      smsLog: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Registration",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Registration"} is forbidden for roles: ${roles}`
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
  @common.Patch("/:id/smsLog")
  @nestAccessControl.UseRoles({
    resource: "Registration",
    action: "update",
    possession: "any",
  })
  async updateSmsLog(
    @common.Param() params: RegistrationWhereUniqueInput,
    @common.Body() body: RegistrationWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      smsLog: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Registration",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Registration"} is forbidden for roles: ${roles}`
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
  @common.Delete("/:id/smsLog")
  @nestAccessControl.UseRoles({
    resource: "Registration",
    action: "update",
    possession: "any",
  })
  async deleteSmsLog(
    @common.Param() params: RegistrationWhereUniqueInput,
    @common.Body() body: RegistrationWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      smsLog: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Registration",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Registration"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }
}
