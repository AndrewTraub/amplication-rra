import { ArgsType, Field } from "@nestjs/graphql";
import { LogCreateInput } from "./LogCreateInput";

@ArgsType()
class CreateLogArgs {
  @Field(() => LogCreateInput, { nullable: false })
  data!: LogCreateInput;
}

export { CreateLogArgs };
