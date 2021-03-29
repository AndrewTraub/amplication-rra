import { EmailListWhereUniqueInput } from "../emailList/EmailListWhereUniqueInput";

export type EmailTemplate = {
  active: boolean | null;
  body: string;
  createdAt: Date;
  delay: number;
  emailList?: EmailListWhereUniqueInput;
  id: string;
  sequenceNumber: number;
  title: string | null;
  updatedAt: Date;
};
