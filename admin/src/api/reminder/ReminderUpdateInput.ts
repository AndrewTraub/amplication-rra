import { StateWhereUniqueInput } from "../state/StateWhereUniqueInput";

export type ReminderUpdateInput = {
  active?: boolean | null;
  body?: string | null;
  day?: number | null;
  month?: number | null;
  state?: StateWhereUniqueInput;
  title?: string;
};
