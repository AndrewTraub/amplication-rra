import { registerEnumType } from "@nestjs/graphql";

export enum EnumRegistrationStatus {
  Unregistered = "Unregistered",
  Registered = "Registered",
  Overdue = "Overdue",
  Cancelled = "Cancelled",
}

registerEnumType(EnumRegistrationStatus, {
  name: "EnumRegistrationStatus",
});
