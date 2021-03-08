import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type AffiliateStatCreateInput = {
  ip: string;
  status: number;
  statusDate: Date;
  type: number;
  user: UserWhereUniqueInput;
};
