import { StateWhereUniqueInput } from "../state/StateWhereUniqueInput";

export type Form = {
  createdAt: Date;
  id: string;
  mustAcceptRisk: boolean;
  privateDescription: string | null;
  provatefilename: string;
  public: boolean | null;
  publicDescription: string | null;
  publicName: string;
  state: StateWhereUniqueInput;
  updatedAt: Date;
  useRegistrationDate: boolean | null;
};
