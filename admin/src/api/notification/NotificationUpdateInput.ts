import { RegistrationWhereUniqueInput } from "../registration/RegistrationWhereUniqueInput";

export type NotificationUpdateInput = {
  disabled?: boolean | null;
  email?: string;
  fax?: string | null;
  phone?: string;
  registrationId?: RegistrationWhereUniqueInput | null;
  sendFax?: boolean | null;
  sendSms?: boolean | null;
};
