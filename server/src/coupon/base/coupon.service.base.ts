import { PrismaService } from "nestjs-prisma";

import {
  FindOneCouponArgs,
  FindManyCouponArgs,
  CouponCreateArgs,
  CouponUpdateArgs,
  CouponDeleteArgs,
  Subset,
  Coupon,
} from "@prisma/client";

export class CouponServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends FindManyCouponArgs>(
    args: Subset<T, FindManyCouponArgs>
  ): Promise<Coupon[]> {
    return this.prisma.coupon.findMany(args);
  }
  async findOne<T extends FindOneCouponArgs>(
    args: Subset<T, FindOneCouponArgs>
  ): Promise<Coupon | null> {
    return this.prisma.coupon.findOne(args);
  }
  async create<T extends CouponCreateArgs>(
    args: Subset<T, CouponCreateArgs>
  ): Promise<Coupon> {
    return this.prisma.coupon.create<T>(args);
  }
  async update<T extends CouponUpdateArgs>(
    args: Subset<T, CouponUpdateArgs>
  ): Promise<Coupon> {
    return this.prisma.coupon.update<T>(args);
  }
  async delete<T extends CouponDeleteArgs>(
    args: Subset<T, CouponDeleteArgs>
  ): Promise<Coupon> {
    return this.prisma.coupon.delete(args);
  }
}
