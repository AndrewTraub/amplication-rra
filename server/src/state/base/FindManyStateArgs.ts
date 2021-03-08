import { ArgsType, Field } from "@nestjs/graphql";
import { StateWhereInput } from "./StateWhereInput";

@ArgsType()
class FindManyStateArgs {
  @Field(() => StateWhereInput, { nullable: true })
  where?: StateWhereInput;
}

export { FindManyStateArgs };
