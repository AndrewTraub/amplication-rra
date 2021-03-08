import { registerEnumType } from "@nestjs/graphql";

export enum EnumRegistrationPeriod {
  Month = "Month",
  Year = "Year",
}

registerEnumType(EnumRegistrationPeriod, {
  name: "EnumRegistrationPeriod",
});
