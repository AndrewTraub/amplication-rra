import { StateWhereUniqueInput } from "../state/StateWhereUniqueInput";

export type PdfFormCreateInput = {
  mustAcceptRisk: boolean;
  privateDescription?: string | null;
  provatefilename: string;
  public?: boolean | null;
  publicDescription?: string | null;
  publicName: string;
  state: StateWhereUniqueInput;
  useRegistrationDate?: boolean | null;
};
