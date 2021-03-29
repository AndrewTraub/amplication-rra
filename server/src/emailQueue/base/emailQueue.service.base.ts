import { PrismaService } from "nestjs-prisma";

import {
  FindOneEmailQueueArgs,
  FindManyEmailQueueArgs,
  EmailQueueCreateArgs,
  EmailQueueUpdateArgs,
  EmailQueueDeleteArgs,
  Subset,
  EmailQueue,
  User,
} from "@prisma/client";

export class EmailQueueServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends FindManyEmailQueueArgs>(
    args: Subset<T, FindManyEmailQueueArgs>
  ): Promise<EmailQueue[]> {
    return this.prisma.emailQueue.findMany(args);
  }
  async findOne<T extends FindOneEmailQueueArgs>(
    args: Subset<T, FindOneEmailQueueArgs>
  ): Promise<EmailQueue | null> {
    return this.prisma.emailQueue.findOne(args);
  }
  async create<T extends EmailQueueCreateArgs>(
    args: Subset<T, EmailQueueCreateArgs>
  ): Promise<EmailQueue> {
    return this.prisma.emailQueue.create<T>(args);
  }
  async update<T extends EmailQueueUpdateArgs>(
    args: Subset<T, EmailQueueUpdateArgs>
  ): Promise<EmailQueue> {
    return this.prisma.emailQueue.update<T>(args);
  }
  async delete<T extends EmailQueueDeleteArgs>(
    args: Subset<T, EmailQueueDeleteArgs>
  ): Promise<EmailQueue> {
    return this.prisma.emailQueue.delete(args);
  }

  async getUser(parentId: string): Promise<User | null> {
    return this.prisma.emailQueue
      .findOne({
        where: { id: parentId },
      })
      .user();
  }
}
