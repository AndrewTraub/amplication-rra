import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type Company = {
  address: string;
  address2: string | null;
  city: string;
  country: string;
  createdAt: Date;
  entityType: number | null;
  federalIdNumber: string | null;
  id: string;
  name: string;
  notes: string | null;
  raiUuid: string | null;
  state: string;
  updatedAt: Date;
  userId?: UserWhereUniqueInput;
  zip: string;
};
