import { PrismaService } from "nestjs-prisma";

import {
  FindOneLogTextArgs,
  FindManyLogTextArgs,
  LogTextCreateArgs,
  LogTextUpdateArgs,
  LogTextDeleteArgs,
  Subset,
  LogText,
  Notification,
  Registration,
  User,
} from "@prisma/client";

export class LogTextServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends FindManyLogTextArgs>(
    args: Subset<T, FindManyLogTextArgs>
  ): Promise<LogText[]> {
    return this.prisma.logText.findMany(args);
  }
  async findOne<T extends FindOneLogTextArgs>(
    args: Subset<T, FindOneLogTextArgs>
  ): Promise<LogText | null> {
    return this.prisma.logText.findOne(args);
  }
  async create<T extends LogTextCreateArgs>(
    args: Subset<T, LogTextCreateArgs>
  ): Promise<LogText> {
    return this.prisma.logText.create<T>(args);
  }
  async update<T extends LogTextUpdateArgs>(
    args: Subset<T, LogTextUpdateArgs>
  ): Promise<LogText> {
    return this.prisma.logText.update<T>(args);
  }
  async delete<T extends LogTextDeleteArgs>(
    args: Subset<T, LogTextDeleteArgs>
  ): Promise<LogText> {
    return this.prisma.logText.delete(args);
  }

  async getNotification(parentId: string): Promise<Notification | null> {
    return this.prisma.logText
      .findOne({
        where: { id: parentId },
      })
      .notification();
  }

  async getRegistration(parentId: string): Promise<Registration | null> {
    return this.prisma.logText
      .findOne({
        where: { id: parentId },
      })
      .registration();
  }

  async getUser(parentId: string): Promise<User | null> {
    return this.prisma.logText
      .findOne({
        where: { id: parentId },
      })
      .user();
  }
}
