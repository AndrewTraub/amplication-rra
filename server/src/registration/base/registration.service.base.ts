import { PrismaService } from "nestjs-prisma";

import {
  FindOneRegistrationArgs,
  FindManyRegistrationArgs,
  RegistrationCreateArgs,
  RegistrationUpdateArgs,
  RegistrationDeleteArgs,
  Subset,
  Registration,
  FindManyDocumentArgs,
  Document,
  FindManyLogEmailArgs,
  LogEmail,
  FindManyJournalArgs,
  Journal,
  FindManyNotificationArgs,
  Notification,
  FindManyLogTextArgs,
  LogText,
  Company,
} from "@prisma/client";

export class RegistrationServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends FindManyRegistrationArgs>(
    args: Subset<T, FindManyRegistrationArgs>
  ): Promise<Registration[]> {
    return this.prisma.registration.findMany(args);
  }
  async findOne<T extends FindOneRegistrationArgs>(
    args: Subset<T, FindOneRegistrationArgs>
  ): Promise<Registration | null> {
    return this.prisma.registration.findOne(args);
  }
  async create<T extends RegistrationCreateArgs>(
    args: Subset<T, RegistrationCreateArgs>
  ): Promise<Registration> {
    return this.prisma.registration.create<T>(args);
  }
  async update<T extends RegistrationUpdateArgs>(
    args: Subset<T, RegistrationUpdateArgs>
  ): Promise<Registration> {
    return this.prisma.registration.update<T>(args);
  }
  async delete<T extends RegistrationDeleteArgs>(
    args: Subset<T, RegistrationDeleteArgs>
  ): Promise<Registration> {
    return this.prisma.registration.delete(args);
  }

  async findDocument(
    parentId: string,
    args: FindManyDocumentArgs
  ): Promise<Document[]> {
    return this.prisma.registration
      .findOne({
        where: { id: parentId },
      })
      .document(args);
  }

  async findEmailLog(
    parentId: string,
    args: FindManyLogEmailArgs
  ): Promise<LogEmail[]> {
    return this.prisma.registration
      .findOne({
        where: { id: parentId },
      })
      .emailLog(args);
  }

  async findJournal(
    parentId: string,
    args: FindManyJournalArgs
  ): Promise<Journal[]> {
    return this.prisma.registration
      .findOne({
        where: { id: parentId },
      })
      .journal(args);
  }

  async findNotification(
    parentId: string,
    args: FindManyNotificationArgs
  ): Promise<Notification[]> {
    return this.prisma.registration
      .findOne({
        where: { id: parentId },
      })
      .notification(args);
  }

  async findSmsLog(
    parentId: string,
    args: FindManyLogTextArgs
  ): Promise<LogText[]> {
    return this.prisma.registration
      .findOne({
        where: { id: parentId },
      })
      .smsLog(args);
  }

  async getCompanyId(parentId: string): Promise<Company | null> {
    return this.prisma.registration
      .findOne({
        where: { id: parentId },
      })
      .companyId();
  }
}
