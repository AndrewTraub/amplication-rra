import { registerEnumType } from "@nestjs/graphql";

export enum EnumJournalCategoryIncomeorexpense {
  Income = "Income",
  Expense = "Expense",
}

registerEnumType(EnumJournalCategoryIncomeorexpense, {
  name: "EnumJournalCategoryIncomeorexpense",
});
