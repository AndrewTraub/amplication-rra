import { PrismaService } from "nestjs-prisma";

import {
  FindOneEmailListArgs,
  FindManyEmailListArgs,
  EmailListCreateArgs,
  EmailListUpdateArgs,
  EmailListDeleteArgs,
  Subset,
  EmailList,
  FindManyEmailTemplateArgs,
  EmailTemplate,
} from "@prisma/client";

export class EmailListServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends FindManyEmailListArgs>(
    args: Subset<T, FindManyEmailListArgs>
  ): Promise<EmailList[]> {
    return this.prisma.emailList.findMany(args);
  }
  async findOne<T extends FindOneEmailListArgs>(
    args: Subset<T, FindOneEmailListArgs>
  ): Promise<EmailList | null> {
    return this.prisma.emailList.findOne(args);
  }
  async create<T extends EmailListCreateArgs>(
    args: Subset<T, EmailListCreateArgs>
  ): Promise<EmailList> {
    return this.prisma.emailList.create<T>(args);
  }
  async update<T extends EmailListUpdateArgs>(
    args: Subset<T, EmailListUpdateArgs>
  ): Promise<EmailList> {
    return this.prisma.emailList.update<T>(args);
  }
  async delete<T extends EmailListDeleteArgs>(
    args: Subset<T, EmailListDeleteArgs>
  ): Promise<EmailList> {
    return this.prisma.emailList.delete(args);
  }

  async findTemplate(
    parentId: string,
    args: FindManyEmailTemplateArgs
  ): Promise<EmailTemplate[]> {
    return this.prisma.emailList
      .findOne({
        where: { id: parentId },
      })
      .template(args);
  }
}
