import { registerEnumType } from "@nestjs/graphql";

export enum EnumJournalJournaltype {
  Sj = "Sj",
  Ap = "Ap",
}

registerEnumType(EnumJournalJournaltype, {
  name: "EnumJournalJournaltype",
});
