import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type LogUpdateInput = {
  category?: string | null;
  entry?: string;
  table?: string;
  user?: UserWhereUniqueInput | null;
};
