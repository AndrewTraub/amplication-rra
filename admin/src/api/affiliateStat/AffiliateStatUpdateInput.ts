import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type AffiliateStatUpdateInput = {
  ip?: string;
  status?: number;
  statusDate?: Date;
  type?: number;
  user?: UserWhereUniqueInput;
};
