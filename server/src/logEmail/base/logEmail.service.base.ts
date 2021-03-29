import { PrismaService } from "nestjs-prisma";

import {
  FindOneLogEmailArgs,
  FindManyLogEmailArgs,
  LogEmailCreateArgs,
  LogEmailUpdateArgs,
  LogEmailDeleteArgs,
  Subset,
  LogEmail,
  Notification,
  Registration,
  User,
} from "@prisma/client";

export class LogEmailServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends FindManyLogEmailArgs>(
    args: Subset<T, FindManyLogEmailArgs>
  ): Promise<LogEmail[]> {
    return this.prisma.logEmail.findMany(args);
  }
  async findOne<T extends FindOneLogEmailArgs>(
    args: Subset<T, FindOneLogEmailArgs>
  ): Promise<LogEmail | null> {
    return this.prisma.logEmail.findOne(args);
  }
  async create<T extends LogEmailCreateArgs>(
    args: Subset<T, LogEmailCreateArgs>
  ): Promise<LogEmail> {
    return this.prisma.logEmail.create<T>(args);
  }
  async update<T extends LogEmailUpdateArgs>(
    args: Subset<T, LogEmailUpdateArgs>
  ): Promise<LogEmail> {
    return this.prisma.logEmail.update<T>(args);
  }
  async delete<T extends LogEmailDeleteArgs>(
    args: Subset<T, LogEmailDeleteArgs>
  ): Promise<LogEmail> {
    return this.prisma.logEmail.delete(args);
  }

  async getNotification(parentId: string): Promise<Notification | null> {
    return this.prisma.logEmail
      .findOne({
        where: { id: parentId },
      })
      .notification();
  }

  async getRegistration(parentId: string): Promise<Registration | null> {
    return this.prisma.logEmail
      .findOne({
        where: { id: parentId },
      })
      .registration();
  }

  async getUser(parentId: string): Promise<User | null> {
    return this.prisma.logEmail
      .findOne({
        where: { id: parentId },
      })
      .user();
  }
}
