import { StateWhereUniqueInput } from "../state/StateWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type AgentUpdateInput = {
  address?: string;
  endDate?: Date | null;
  fee?: number;
  name?: string;
  payTo?: string | null;
  startDate?: Date;
  state?: StateWhereUniqueInput;
  taxId?: string | null;
  user?: UserWhereUniqueInput;
};
