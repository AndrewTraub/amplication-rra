export type CouponWhereInput = {
  amount?: number | null;
  coupon?: string;
  createdAt?: Date;
  id?: string;
  minTerm?: "Month" | "Year";
  updatedAt?: Date;
  validFrom?: Date;
  validTo?: Date;
};
