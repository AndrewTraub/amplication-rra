import { ArgsType, Field } from "@nestjs/graphql";
import { StateWhereUniqueInput } from "./StateWhereUniqueInput";

@ArgsType()
class DeleteStateArgs {
  @Field(() => StateWhereUniqueInput, { nullable: false })
  where!: StateWhereUniqueInput;
}

export { DeleteStateArgs };
