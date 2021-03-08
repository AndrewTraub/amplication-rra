import { StateWhereUniqueInput } from "../state/StateWhereUniqueInput";

export type PdfFormWhereInput = {
  createdAt?: Date;
  id?: string;
  mustAcceptRisk?: boolean;
  privateDescription?: string | null;
  provatefilename?: string;
  public?: boolean | null;
  publicDescription?: string | null;
  publicName?: string;
  state?: StateWhereUniqueInput;
  updatedAt?: Date;
  useRegistrationDate?: boolean | null;
};
