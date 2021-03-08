import { PrismaService } from "nestjs-prisma";
import {
  FindOneEmailQueueArgs,
  FindManyEmailQueueArgs,
  EmailQueueCreateArgs,
  EmailQueueUpdateArgs,
  EmailQueueDeleteArgs,
  Subset,
} from "@prisma/client";

export class EmailQueueServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyEmailQueueArgs>(
    args: Subset<T, FindManyEmailQueueArgs>
  ) {
    return this.prisma.emailQueue.findMany(args);
  }
  findOne<T extends FindOneEmailQueueArgs>(
    args: Subset<T, FindOneEmailQueueArgs>
  ) {
    return this.prisma.emailQueue.findOne(args);
  }
  create<T extends EmailQueueCreateArgs>(
    args: Subset<T, EmailQueueCreateArgs>
  ) {
    return this.prisma.emailQueue.create<T>(args);
  }
  update<T extends EmailQueueUpdateArgs>(
    args: Subset<T, EmailQueueUpdateArgs>
  ) {
    return this.prisma.emailQueue.update<T>(args);
  }
  delete<T extends EmailQueueDeleteArgs>(
    args: Subset<T, EmailQueueDeleteArgs>
  ) {
    return this.prisma.emailQueue.delete(args);
  }
}
