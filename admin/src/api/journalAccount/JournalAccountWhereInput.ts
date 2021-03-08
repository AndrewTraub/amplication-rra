export type JournalAccountWhereInput = {
  accountNumber?: string;
  assettype?:
    | "Asset"
    | "Liability"
    | "Equity"
    | "Receivable"
    | "Expense"
    | null;
  balance?: number | null;
  createdAt?: Date;
  description?: string | null;
  id?: string;
  updatedAt?: Date;
};
