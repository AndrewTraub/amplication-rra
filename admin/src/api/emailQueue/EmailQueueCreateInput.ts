import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type EmailQueueCreateInput = {
  message?: string | null;
  sent?: boolean | null;
  subject: string;
  timeToSend: Date;
  type?: number | null;
  user?: UserWhereUniqueInput | null;
};
