import { ArgsType, Field } from "@nestjs/graphql";
import { LogTextWhereInput } from "./LogTextWhereInput";

@ArgsType()
class FindManyLogTextArgs {
  @Field(() => LogTextWhereInput, { nullable: true })
  where?: LogTextWhereInput;
}

export { FindManyLogTextArgs };
