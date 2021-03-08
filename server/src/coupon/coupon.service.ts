import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { CouponServiceBase } from "./base/coupon.service.base";

@Injectable()
export class CouponService extends CouponServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
