import { PrismaService } from "nestjs-prisma";
import {
  FindOneEmailTemplateArgs,
  FindManyEmailTemplateArgs,
  EmailTemplateCreateArgs,
  EmailTemplateUpdateArgs,
  EmailTemplateDeleteArgs,
  Subset,
} from "@prisma/client";

export class EmailTemplateServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyEmailTemplateArgs>(
    args: Subset<T, FindManyEmailTemplateArgs>
  ) {
    return this.prisma.emailTemplate.findMany(args);
  }
  findOne<T extends FindOneEmailTemplateArgs>(
    args: Subset<T, FindOneEmailTemplateArgs>
  ) {
    return this.prisma.emailTemplate.findOne(args);
  }
  create<T extends EmailTemplateCreateArgs>(
    args: Subset<T, EmailTemplateCreateArgs>
  ) {
    return this.prisma.emailTemplate.create<T>(args);
  }
  update<T extends EmailTemplateUpdateArgs>(
    args: Subset<T, EmailTemplateUpdateArgs>
  ) {
    return this.prisma.emailTemplate.update<T>(args);
  }
  delete<T extends EmailTemplateDeleteArgs>(
    args: Subset<T, EmailTemplateDeleteArgs>
  ) {
    return this.prisma.emailTemplate.delete(args);
  }
}
