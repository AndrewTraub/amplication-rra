import { PrismaService } from "nestjs-prisma";
import {
  FindOneCouponArgs,
  FindManyCouponArgs,
  CouponCreateArgs,
  CouponUpdateArgs,
  CouponDeleteArgs,
  Subset,
} from "@prisma/client";

export class CouponServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyCouponArgs>(args: Subset<T, FindManyCouponArgs>) {
    return this.prisma.coupon.findMany(args);
  }
  findOne<T extends FindOneCouponArgs>(args: Subset<T, FindOneCouponArgs>) {
    return this.prisma.coupon.findOne(args);
  }
  create<T extends CouponCreateArgs>(args: Subset<T, CouponCreateArgs>) {
    return this.prisma.coupon.create<T>(args);
  }
  update<T extends CouponUpdateArgs>(args: Subset<T, CouponUpdateArgs>) {
    return this.prisma.coupon.update<T>(args);
  }
  delete<T extends CouponDeleteArgs>(args: Subset<T, CouponDeleteArgs>) {
    return this.prisma.coupon.delete(args);
  }
}
