import { Module } from "@nestjs/common";
import { CouponModuleBase } from "./base/coupon.module.base";
import { CouponService } from "./coupon.service";
import { CouponController } from "./coupon.controller";
import { CouponResolver } from "./coupon.resolver";

@Module({
  imports: [CouponModuleBase],
  controllers: [CouponController],
  providers: [CouponService, CouponResolver],
  exports: [CouponService],
})
export class CouponModule {}
