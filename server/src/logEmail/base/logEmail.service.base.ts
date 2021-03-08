import { PrismaService } from "nestjs-prisma";
import {
  FindOneLogEmailArgs,
  FindManyLogEmailArgs,
  LogEmailCreateArgs,
  LogEmailUpdateArgs,
  LogEmailDeleteArgs,
  Subset,
} from "@prisma/client";

export class LogEmailServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyLogEmailArgs>(
    args: Subset<T, FindManyLogEmailArgs>
  ) {
    return this.prisma.logEmail.findMany(args);
  }
  findOne<T extends FindOneLogEmailArgs>(args: Subset<T, FindOneLogEmailArgs>) {
    return this.prisma.logEmail.findOne(args);
  }
  create<T extends LogEmailCreateArgs>(args: Subset<T, LogEmailCreateArgs>) {
    return this.prisma.logEmail.create<T>(args);
  }
  update<T extends LogEmailUpdateArgs>(args: Subset<T, LogEmailUpdateArgs>) {
    return this.prisma.logEmail.update<T>(args);
  }
  delete<T extends LogEmailDeleteArgs>(args: Subset<T, LogEmailDeleteArgs>) {
    return this.prisma.logEmail.delete(args);
  }
}
