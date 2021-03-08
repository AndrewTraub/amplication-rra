import { RegistrationWhereUniqueInput } from "../registration/RegistrationWhereUniqueInput";

export type NotificationWhereInput = {
  createdAt?: Date;
  disabled?: boolean | null;
  email?: string;
  fax?: string | null;
  id?: string;
  phone?: string;
  registrationId?: RegistrationWhereUniqueInput | null;
  sendFax?: boolean | null;
  sendSms?: boolean | null;
  updatedAt?: Date;
};
