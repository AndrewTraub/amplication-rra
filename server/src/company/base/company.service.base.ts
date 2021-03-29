import { PrismaService } from "nestjs-prisma";

import {
  FindOneCompanyArgs,
  FindManyCompanyArgs,
  CompanyCreateArgs,
  CompanyUpdateArgs,
  CompanyDeleteArgs,
  Subset,
  Company,
  FindManyRegistrationArgs,
  Registration,
  User,
} from "@prisma/client";

export class CompanyServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends FindManyCompanyArgs>(
    args: Subset<T, FindManyCompanyArgs>
  ): Promise<Company[]> {
    return this.prisma.company.findMany(args);
  }
  async findOne<T extends FindOneCompanyArgs>(
    args: Subset<T, FindOneCompanyArgs>
  ): Promise<Company | null> {
    return this.prisma.company.findOne(args);
  }
  async create<T extends CompanyCreateArgs>(
    args: Subset<T, CompanyCreateArgs>
  ): Promise<Company> {
    return this.prisma.company.create<T>(args);
  }
  async update<T extends CompanyUpdateArgs>(
    args: Subset<T, CompanyUpdateArgs>
  ): Promise<Company> {
    return this.prisma.company.update<T>(args);
  }
  async delete<T extends CompanyDeleteArgs>(
    args: Subset<T, CompanyDeleteArgs>
  ): Promise<Company> {
    return this.prisma.company.delete(args);
  }

  async findRegistration(
    parentId: string,
    args: FindManyRegistrationArgs
  ): Promise<Registration[]> {
    return this.prisma.company
      .findOne({
        where: { id: parentId },
      })
      .registration(args);
  }

  async getUserId(parentId: string): Promise<User | null> {
    return this.prisma.company
      .findOne({
        where: { id: parentId },
      })
      .userId();
  }
}
