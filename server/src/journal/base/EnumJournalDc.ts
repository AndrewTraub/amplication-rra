import { registerEnumType } from "@nestjs/graphql";

export enum EnumJournalDc {
  D = "D",
  C = "C",
}

registerEnumType(EnumJournalDc, {
  name: "EnumJournalDc",
});
