import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type Log = {
  category: string | null;
  createdAt: Date;
  entry: string;
  id: string;
  table: string;
  updatedAt: Date;
  user?: UserWhereUniqueInput | null;
};
