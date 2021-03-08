import { ArgsType, Field } from "@nestjs/graphql";
import { LogTextCreateInput } from "./LogTextCreateInput";

@ArgsType()
class CreateLogTextArgs {
  @Field(() => LogTextCreateInput, { nullable: false })
  data!: LogTextCreateInput;
}

export { CreateLogTextArgs };
