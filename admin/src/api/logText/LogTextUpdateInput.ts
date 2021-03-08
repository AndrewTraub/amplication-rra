import { NotificationWhereUniqueInput } from "../notification/NotificationWhereUniqueInput";
import { RegistrationWhereUniqueInput } from "../registration/RegistrationWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type LogTextUpdateInput = {
  message?: string;
  notification?: NotificationWhereUniqueInput | null;
  registration?: RegistrationWhereUniqueInput | null;
  response?: string | null;
  sent?: Date;
  sentBy?: string;
  sentToNumber?: string;
  smsTriggerReason?: string | null;
  user?: UserWhereUniqueInput | null;
};
