export type CouponCreateInput = {
  amount?: number | null;
  coupon: string;
  minTerm: "Month" | "Year";
  validFrom: Date;
  validTo: Date;
};
