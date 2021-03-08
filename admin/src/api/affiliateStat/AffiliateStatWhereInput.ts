import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type AffiliateStatWhereInput = {
  createdAt?: Date;
  id?: string;
  ip?: string;
  status?: number;
  statusDate?: Date;
  type?: number;
  updatedAt?: Date;
  user?: UserWhereUniqueInput;
};
