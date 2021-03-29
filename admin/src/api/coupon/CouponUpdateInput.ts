export type CouponUpdateInput = {
  amount?: number | null;
  coupon?: string;
  minTerm?: "Month" | "Year";
  validFrom?: Date;
  validTo?: Date;
};
