export type JournalCategoryUpdateInput = {
  incomeorexpense?: "Income" | "Expense";
  name?: string;
  sort?: number | null;
};
