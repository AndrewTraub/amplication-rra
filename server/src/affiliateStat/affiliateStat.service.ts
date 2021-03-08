import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { AffiliateStatServiceBase } from "./base/affiliateStat.service.base";

@Injectable()
export class AffiliateStatService extends AffiliateStatServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
