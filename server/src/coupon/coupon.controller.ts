import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { CouponService } from "./coupon.service";
import { CouponControllerBase } from "./base/coupon.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("coupons")
@common.Controller("coupons")
export class CouponController extends CouponControllerBase {
  constructor(
    protected readonly service: CouponService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
