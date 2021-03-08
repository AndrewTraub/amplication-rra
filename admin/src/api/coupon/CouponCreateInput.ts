export type CouponCreateInput = {
  amount?: number | null;
  coupon: string;
  validFrom: Date;
  validTo: Date;
};
