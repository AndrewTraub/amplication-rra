import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type LogCreateInput = {
  category?: string | null;
  entry: string;
  table: string;
  user?: UserWhereUniqueInput | null;
};
