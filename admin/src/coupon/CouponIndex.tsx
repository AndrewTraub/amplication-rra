import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { CouponList } from "./CouponList";
import { CreateCoupon } from "./CreateCoupon";
import { Coupon } from "./Coupon";

export const CouponIndex = (): React.ReactElement => {
  useBreadcrumbs("/coupons/", "Coupons");

  return (
    <Switch>
      <PrivateRoute exact path={"/coupons/"} component={CouponList} />
      <PrivateRoute path={"/coupons/new"} component={CreateCoupon} />
      <PrivateRoute path={"/coupons/:id"} component={Coupon} />
    </Switch>
  );
};
