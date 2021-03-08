import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type CompanyUpdateInput = {
  address?: string;
  address2?: string | null;
  city?: string;
  country?: string;
  entityType?: number | null;
  federalIdNumber?: string | null;
  name?: string;
  notes?: string | null;
  raiUuid?: string | null;
  state?: string;
  userId?: UserWhereUniqueInput;
  zip?: string;
};
