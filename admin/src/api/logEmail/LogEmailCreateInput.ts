import { NotificationWhereUniqueInput } from "../notification/NotificationWhereUniqueInput";
import { RegistrationWhereUniqueInput } from "../registration/RegistrationWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type LogEmailCreateInput = {
  emailEvent?: string | null;
  emailTo?: string | null;
  messageId?: string | null;
  notification?: NotificationWhereUniqueInput | null;
  registration?: RegistrationWhereUniqueInput | null;
  sentOn?: Date | null;
  user?: UserWhereUniqueInput | null;
};
