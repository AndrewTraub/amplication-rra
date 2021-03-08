import { StateWhereUniqueInput } from "../state/StateWhereUniqueInput";

export type FormCreateInput = {
  mustAcceptRisk: boolean;
  privateDescription?: string | null;
  provatefilename: string;
  public?: boolean | null;
  publicDescription?: string | null;
  publicName: string;
  state: StateWhereUniqueInput;
  useRegistrationDate?: boolean | null;
};
