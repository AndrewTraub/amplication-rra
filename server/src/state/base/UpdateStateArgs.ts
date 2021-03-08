import { ArgsType, Field } from "@nestjs/graphql";
import { StateWhereUniqueInput } from "./StateWhereUniqueInput";
import { StateUpdateInput } from "./StateUpdateInput";

@ArgsType()
class UpdateStateArgs {
  @Field(() => StateWhereUniqueInput, { nullable: false })
  where!: StateWhereUniqueInput;
  @Field(() => StateUpdateInput, { nullable: false })
  data!: StateUpdateInput;
}

export { UpdateStateArgs };
