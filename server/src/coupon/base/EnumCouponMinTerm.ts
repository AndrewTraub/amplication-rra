import { registerEnumType } from "@nestjs/graphql";

export enum EnumCouponMinTerm {
  Month = "Month",
  Year = "Year",
}

registerEnumType(EnumCouponMinTerm, {
  name: "EnumCouponMinTerm",
});
