import { PrismaService } from "nestjs-prisma";
import {
  FindOneLogTextArgs,
  FindManyLogTextArgs,
  LogTextCreateArgs,
  LogTextUpdateArgs,
  LogTextDeleteArgs,
  Subset,
} from "@prisma/client";

export class LogTextServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyLogTextArgs>(
    args: Subset<T, FindManyLogTextArgs>
  ) {
    return this.prisma.logText.findMany(args);
  }
  findOne<T extends FindOneLogTextArgs>(args: Subset<T, FindOneLogTextArgs>) {
    return this.prisma.logText.findOne(args);
  }
  create<T extends LogTextCreateArgs>(args: Subset<T, LogTextCreateArgs>) {
    return this.prisma.logText.create<T>(args);
  }
  update<T extends LogTextUpdateArgs>(args: Subset<T, LogTextUpdateArgs>) {
    return this.prisma.logText.update<T>(args);
  }
  delete<T extends LogTextDeleteArgs>(args: Subset<T, LogTextDeleteArgs>) {
    return this.prisma.logText.delete(args);
  }
}
