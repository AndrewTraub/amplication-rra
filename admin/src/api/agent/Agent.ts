import { StateWhereUniqueInput } from "../state/StateWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type Agent = {
  address: string;
  createdAt: Date;
  endDate: Date | null;
  fee: number;
  id: string;
  name: string;
  payTo: string | null;
  startDate: Date;
  state: StateWhereUniqueInput;
  taxId: string | null;
  updatedAt: Date;
  user: UserWhereUniqueInput;
};
