import { ArgsType, Field } from "@nestjs/graphql";
import { StateCreateInput } from "./StateCreateInput";

@ArgsType()
class CreateStateArgs {
  @Field(() => StateCreateInput, { nullable: false })
  data!: StateCreateInput;
}

export { CreateStateArgs };
