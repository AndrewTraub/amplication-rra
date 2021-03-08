import { EmailListWhereUniqueInput } from "../emailList/EmailListWhereUniqueInput";

export type EmailTemplateUpdateInput = {
  active?: boolean | null;
  body?: string;
  delay?: number;
  emailList?: EmailListWhereUniqueInput;
  sequenceNumber?: number;
  title?: string | null;
};
