import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type LogWhereInput = {
  category?: string | null;
  createdAt?: Date;
  entry?: string;
  id?: string;
  table?: string;
  updatedAt?: Date;
  user?: UserWhereUniqueInput | null;
};
