import { RegistrationWhereUniqueInput } from "../registration/RegistrationWhereUniqueInput";
import { AgentWhereUniqueInput } from "../agent/AgentWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type DocumentCreateInput = {
  fileType?: string | null;
  fileUrl: string;
  notes?: string | null;
  registrationId?: RegistrationWhereUniqueInput | null;
  title: string;
  uploadedBy?: AgentWhereUniqueInput | null;
  userId?: UserWhereUniqueInput | null;
};
