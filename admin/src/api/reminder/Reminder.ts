import { StateWhereUniqueInput } from "../state/StateWhereUniqueInput";

export type Reminder = {
  active: boolean | null;
  body: string | null;
  createdAt: Date;
  day: number | null;
  id: string;
  month: number | null;
  state?: StateWhereUniqueInput;
  title: string;
  updatedAt: Date;
};
