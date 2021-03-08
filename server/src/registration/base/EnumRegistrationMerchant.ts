import { registerEnumType } from "@nestjs/graphql";

export enum EnumRegistrationMerchant {
  AuthorizeNet = "AuthorizeNet",
  Paypal = "Paypal",
  Stripe = "Stripe",
}

registerEnumType(EnumRegistrationMerchant, {
  name: "EnumRegistrationMerchant",
});
