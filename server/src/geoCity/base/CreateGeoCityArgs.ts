import { ArgsType, Field } from "@nestjs/graphql";
import { GeoCityCreateInput } from "./GeoCityCreateInput";

@ArgsType()
class CreateGeoCityArgs {
  @Field(() => GeoCityCreateInput, { nullable: false })
  data!: GeoCityCreateInput;
}

export { CreateGeoCityArgs };
