import { NotificationWhereUniqueInput } from "../notification/NotificationWhereUniqueInput";
import { RegistrationWhereUniqueInput } from "../registration/RegistrationWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type LogEmailWhereInput = {
  createdAt?: Date;
  emailEvent?: string | null;
  emailTo?: string | null;
  id?: string;
  messageId?: string | null;
  notification?: NotificationWhereUniqueInput | null;
  registration?: RegistrationWhereUniqueInput | null;
  sentOn?: Date | null;
  updatedAt?: Date;
  user?: UserWhereUniqueInput | null;
};
