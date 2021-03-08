import { ArgsType, Field } from "@nestjs/graphql";
import { LogEmailCreateInput } from "./LogEmailCreateInput";

@ArgsType()
class CreateLogEmailArgs {
  @Field(() => LogEmailCreateInput, { nullable: false })
  data!: LogEmailCreateInput;
}

export { CreateLogEmailArgs };
