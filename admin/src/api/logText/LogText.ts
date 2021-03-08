import { NotificationWhereUniqueInput } from "../notification/NotificationWhereUniqueInput";
import { RegistrationWhereUniqueInput } from "../registration/RegistrationWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type LogText = {
  createdAt: Date;
  id: string;
  message: string;
  notification?: NotificationWhereUniqueInput | null;
  registration?: RegistrationWhereUniqueInput | null;
  response: string | null;
  sent: Date;
  sentBy: string;
  sentToNumber: string;
  smsTriggerReason: string | null;
  updatedAt: Date;
  user?: UserWhereUniqueInput | null;
};
