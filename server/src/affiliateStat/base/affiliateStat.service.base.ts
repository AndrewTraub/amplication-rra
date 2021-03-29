import { PrismaService } from "nestjs-prisma";

import {
  FindOneAffiliateStatArgs,
  FindManyAffiliateStatArgs,
  AffiliateStatCreateArgs,
  AffiliateStatUpdateArgs,
  AffiliateStatDeleteArgs,
  Subset,
  AffiliateStat,
  User,
} from "@prisma/client";

export class AffiliateStatServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends FindManyAffiliateStatArgs>(
    args: Subset<T, FindManyAffiliateStatArgs>
  ): Promise<AffiliateStat[]> {
    return this.prisma.affiliateStat.findMany(args);
  }
  async findOne<T extends FindOneAffiliateStatArgs>(
    args: Subset<T, FindOneAffiliateStatArgs>
  ): Promise<AffiliateStat | null> {
    return this.prisma.affiliateStat.findOne(args);
  }
  async create<T extends AffiliateStatCreateArgs>(
    args: Subset<T, AffiliateStatCreateArgs>
  ): Promise<AffiliateStat> {
    return this.prisma.affiliateStat.create<T>(args);
  }
  async update<T extends AffiliateStatUpdateArgs>(
    args: Subset<T, AffiliateStatUpdateArgs>
  ): Promise<AffiliateStat> {
    return this.prisma.affiliateStat.update<T>(args);
  }
  async delete<T extends AffiliateStatDeleteArgs>(
    args: Subset<T, AffiliateStatDeleteArgs>
  ): Promise<AffiliateStat> {
    return this.prisma.affiliateStat.delete(args);
  }

  async getUser(parentId: string): Promise<User | null> {
    return this.prisma.affiliateStat
      .findOne({
        where: { id: parentId },
      })
      .user();
  }
}
