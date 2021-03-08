export type JournalCategoryCreateInput = {
  incomeorexpense: "Income" | "Expense";
  name: string;
  sort?: number | null;
};
