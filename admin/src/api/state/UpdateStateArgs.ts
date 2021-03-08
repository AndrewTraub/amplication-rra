import { StateWhereUniqueInput } from "./StateWhereUniqueInput";
import { StateUpdateInput } from "./StateUpdateInput";

export type UpdateStateArgs = {
  where: StateWhereUniqueInput;
  data: StateUpdateInput;
};
