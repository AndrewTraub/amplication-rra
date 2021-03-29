import { PrismaService } from "nestjs-prisma";

import {
  FindOneLogArgs,
  FindManyLogArgs,
  LogCreateArgs,
  LogUpdateArgs,
  LogDeleteArgs,
  Subset,
  Log,
  User,
} from "@prisma/client";

export class LogServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends FindManyLogArgs>(
    args: Subset<T, FindManyLogArgs>
  ): Promise<Log[]> {
    return this.prisma.log.findMany(args);
  }
  async findOne<T extends FindOneLogArgs>(
    args: Subset<T, FindOneLogArgs>
  ): Promise<Log | null> {
    return this.prisma.log.findOne(args);
  }
  async create<T extends LogCreateArgs>(
    args: Subset<T, LogCreateArgs>
  ): Promise<Log> {
    return this.prisma.log.create<T>(args);
  }
  async update<T extends LogUpdateArgs>(
    args: Subset<T, LogUpdateArgs>
  ): Promise<Log> {
    return this.prisma.log.update<T>(args);
  }
  async delete<T extends LogDeleteArgs>(
    args: Subset<T, LogDeleteArgs>
  ): Promise<Log> {
    return this.prisma.log.delete(args);
  }

  async getUser(parentId: string): Promise<User | null> {
    return this.prisma.log
      .findOne({
        where: { id: parentId },
      })
      .user();
  }
}
