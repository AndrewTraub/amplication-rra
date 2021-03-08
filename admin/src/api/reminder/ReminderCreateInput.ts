import { StateWhereUniqueInput } from "../state/StateWhereUniqueInput";

export type ReminderCreateInput = {
  active?: boolean | null;
  body?: string | null;
  day?: number | null;
  month?: number | null;
  state: StateWhereUniqueInput;
  title: string;
};
