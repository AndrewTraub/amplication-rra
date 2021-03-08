import { PrismaService } from "nestjs-prisma";
import {
  FindOneCompanyArgs,
  FindManyCompanyArgs,
  CompanyCreateArgs,
  CompanyUpdateArgs,
  CompanyDeleteArgs,
  Subset,
} from "@prisma/client";

export class CompanyServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyCompanyArgs>(
    args: Subset<T, FindManyCompanyArgs>
  ) {
    return this.prisma.company.findMany(args);
  }
  findOne<T extends FindOneCompanyArgs>(args: Subset<T, FindOneCompanyArgs>) {
    return this.prisma.company.findOne(args);
  }
  create<T extends CompanyCreateArgs>(args: Subset<T, CompanyCreateArgs>) {
    return this.prisma.company.create<T>(args);
  }
  update<T extends CompanyUpdateArgs>(args: Subset<T, CompanyUpdateArgs>) {
    return this.prisma.company.update<T>(args);
  }
  delete<T extends CompanyDeleteArgs>(args: Subset<T, CompanyDeleteArgs>) {
    return this.prisma.company.delete(args);
  }
}
