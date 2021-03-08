import { RegistrationWhereUniqueInput } from "../registration/RegistrationWhereUniqueInput";
import { AgentWhereUniqueInput } from "../agent/AgentWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type Document = {
  createdAt: Date;
  fileType: string | null;
  fileUrl: string;
  id: string;
  notes: string | null;
  registrationId?: RegistrationWhereUniqueInput | null;
  title: string;
  updatedAt: Date;
  uploadedBy?: AgentWhereUniqueInput | null;
  userId?: UserWhereUniqueInput | null;
};
