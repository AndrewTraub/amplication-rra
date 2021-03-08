import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type EmailQueue = {
  createdAt: Date;
  id: string;
  message: string | null;
  sent: boolean | null;
  subject: string;
  timeToSend: Date;
  type: number | null;
  updatedAt: Date;
  user?: UserWhereUniqueInput | null;
};
