import { ArgsType, Field } from "@nestjs/graphql";
import { StateWhereUniqueInput } from "./StateWhereUniqueInput";

@ArgsType()
class FindOneStateArgs {
  @Field(() => StateWhereUniqueInput, { nullable: false })
  where!: StateWhereUniqueInput;
}

export { FindOneStateArgs };
