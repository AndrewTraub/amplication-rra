import { PrismaService } from "nestjs-prisma";
import {
  FindOneLogArgs,
  FindManyLogArgs,
  LogCreateArgs,
  LogUpdateArgs,
  LogDeleteArgs,
  Subset,
} from "@prisma/client";

export class LogServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyLogArgs>(args: Subset<T, FindManyLogArgs>) {
    return this.prisma.log.findMany(args);
  }
  findOne<T extends FindOneLogArgs>(args: Subset<T, FindOneLogArgs>) {
    return this.prisma.log.findOne(args);
  }
  create<T extends LogCreateArgs>(args: Subset<T, LogCreateArgs>) {
    return this.prisma.log.create<T>(args);
  }
  update<T extends LogUpdateArgs>(args: Subset<T, LogUpdateArgs>) {
    return this.prisma.log.update<T>(args);
  }
  delete<T extends LogDeleteArgs>(args: Subset<T, LogDeleteArgs>) {
    return this.prisma.log.delete(args);
  }
}
