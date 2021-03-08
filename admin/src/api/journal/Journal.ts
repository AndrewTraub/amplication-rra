import { JournalAccountWhereUniqueInput } from "../journalAccount/JournalAccountWhereUniqueInput";
import { AgentWhereUniqueInput } from "../agent/AgentWhereUniqueInput";
import { JournalCategoryWhereUniqueInput } from "../journalCategory/JournalCategoryWhereUniqueInput";
import { RegistrationWhereUniqueInput } from "../registration/RegistrationWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type Journal = {
  account: JournalAccountWhereUniqueInput;
  agent?: AgentWhereUniqueInput | null;
  amount: number;
  category?: JournalCategoryWhereUniqueInput | null;
  comment: string | null;
  createdAt: Date;
  dc: "D" | "C";
  description: string | null;
  id: string;
  journaltype?: "Sj" | "Ap" | null;
  postDate: Date | null;
  posted: boolean | null;
  registration?: RegistrationWhereUniqueInput | null;
  source: string;
  transactionDate: Date;
  transactionId: string | null;
  updatedAt: Date;
  user?: UserWhereUniqueInput | null;
};
