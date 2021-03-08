export type JournalCategoryWhereInput = {
  createdAt?: Date;
  id?: string;
  incomeorexpense?: "Income" | "Expense";
  name?: string;
  sort?: number | null;
  updatedAt?: Date;
};
