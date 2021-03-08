import { CompanyWhereUniqueInput } from "../company/CompanyWhereUniqueInput";

export type RegistrationWhereInput = {
  automaticRenewal?: boolean | null;
  cancelledDate?: Date | null;
  companyId?: CompanyWhereUniqueInput;
  createdAt?: Date;
  dba?: string | null;
  exp?: string | null;
  four?: string | null;
  id?: string;
  merchant?: "AuthorizeNet" | "Paypal" | "Stripe" | null;
  noGracePeriod?: boolean | null;
  period?: "Month" | "Year" | null;
  registeredDate?: Date | null;
  renewalDate?: Date | null;
  state?: string;
  status?: "Unregistered" | "Registered" | "Overdue" | "Cancelled";
  subscriptionId?: string | null;
  updatedAt?: Date;
};
