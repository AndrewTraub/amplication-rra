export type JournalAccountCreateInput = {
  accountNumber: string;
  assettype?:
    | "Asset"
    | "Liability"
    | "Equity"
    | "Receivable"
    | "Expense"
    | null;
  balance?: number | null;
  description?: string | null;
};
