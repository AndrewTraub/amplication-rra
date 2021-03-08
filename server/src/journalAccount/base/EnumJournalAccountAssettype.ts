import { registerEnumType } from "@nestjs/graphql";

export enum EnumJournalAccountAssettype {
  Asset = "Asset",
  Liability = "Liability",
  Equity = "Equity",
  Receivable = "Receivable",
  Expense = "Expense",
}

registerEnumType(EnumJournalAccountAssettype, {
  name: "EnumJournalAccountAssettype",
});
