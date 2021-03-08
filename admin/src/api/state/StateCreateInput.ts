export type StateCreateInput = {
  annualFee: number;
  autoFax?: boolean | null;
  sosFax?: string | null;
  sosPhone?: string | null;
  state: string;
  withdrawalFee?: number | null;
};
