import { PrismaService } from "nestjs-prisma";

import {
  FindOneEmailTemplateArgs,
  FindManyEmailTemplateArgs,
  EmailTemplateCreateArgs,
  EmailTemplateUpdateArgs,
  EmailTemplateDeleteArgs,
  Subset,
  EmailTemplate,
  EmailList,
} from "@prisma/client";

export class EmailTemplateServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends FindManyEmailTemplateArgs>(
    args: Subset<T, FindManyEmailTemplateArgs>
  ): Promise<EmailTemplate[]> {
    return this.prisma.emailTemplate.findMany(args);
  }
  async findOne<T extends FindOneEmailTemplateArgs>(
    args: Subset<T, FindOneEmailTemplateArgs>
  ): Promise<EmailTemplate | null> {
    return this.prisma.emailTemplate.findOne(args);
  }
  async create<T extends EmailTemplateCreateArgs>(
    args: Subset<T, EmailTemplateCreateArgs>
  ): Promise<EmailTemplate> {
    return this.prisma.emailTemplate.create<T>(args);
  }
  async update<T extends EmailTemplateUpdateArgs>(
    args: Subset<T, EmailTemplateUpdateArgs>
  ): Promise<EmailTemplate> {
    return this.prisma.emailTemplate.update<T>(args);
  }
  async delete<T extends EmailTemplateDeleteArgs>(
    args: Subset<T, EmailTemplateDeleteArgs>
  ): Promise<EmailTemplate> {
    return this.prisma.emailTemplate.delete(args);
  }

  async getEmailList(parentId: string): Promise<EmailList | null> {
    return this.prisma.emailTemplate
      .findOne({
        where: { id: parentId },
      })
      .emailList();
  }
}
