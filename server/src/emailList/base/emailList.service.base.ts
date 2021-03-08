import { PrismaService } from "nestjs-prisma";
import {
  FindOneEmailListArgs,
  FindManyEmailListArgs,
  EmailListCreateArgs,
  EmailListUpdateArgs,
  EmailListDeleteArgs,
  Subset,
} from "@prisma/client";

export class EmailListServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyEmailListArgs>(
    args: Subset<T, FindManyEmailListArgs>
  ) {
    return this.prisma.emailList.findMany(args);
  }
  findOne<T extends FindOneEmailListArgs>(
    args: Subset<T, FindOneEmailListArgs>
  ) {
    return this.prisma.emailList.findOne(args);
  }
  create<T extends EmailListCreateArgs>(args: Subset<T, EmailListCreateArgs>) {
    return this.prisma.emailList.create<T>(args);
  }
  update<T extends EmailListUpdateArgs>(args: Subset<T, EmailListUpdateArgs>) {
    return this.prisma.emailList.update<T>(args);
  }
  delete<T extends EmailListDeleteArgs>(args: Subset<T, EmailListDeleteArgs>) {
    return this.prisma.emailList.delete(args);
  }
}
