import { PrismaService } from "nestjs-prisma";
import {
  FindOneAffiliateStatArgs,
  FindManyAffiliateStatArgs,
  AffiliateStatCreateArgs,
  AffiliateStatUpdateArgs,
  AffiliateStatDeleteArgs,
  Subset,
} from "@prisma/client";

export class AffiliateStatServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyAffiliateStatArgs>(
    args: Subset<T, FindManyAffiliateStatArgs>
  ) {
    return this.prisma.affiliateStat.findMany(args);
  }
  findOne<T extends FindOneAffiliateStatArgs>(
    args: Subset<T, FindOneAffiliateStatArgs>
  ) {
    return this.prisma.affiliateStat.findOne(args);
  }
  create<T extends AffiliateStatCreateArgs>(
    args: Subset<T, AffiliateStatCreateArgs>
  ) {
    return this.prisma.affiliateStat.create<T>(args);
  }
  update<T extends AffiliateStatUpdateArgs>(
    args: Subset<T, AffiliateStatUpdateArgs>
  ) {
    return this.prisma.affiliateStat.update<T>(args);
  }
  delete<T extends AffiliateStatDeleteArgs>(
    args: Subset<T, AffiliateStatDeleteArgs>
  ) {
    return this.prisma.affiliateStat.delete(args);
  }
}
