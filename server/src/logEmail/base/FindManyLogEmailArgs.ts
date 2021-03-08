import { ArgsType, Field } from "@nestjs/graphql";
import { LogEmailWhereInput } from "./LogEmailWhereInput";

@ArgsType()
class FindManyLogEmailArgs {
  @Field(() => LogEmailWhereInput, { nullable: true })
  where?: LogEmailWhereInput;
}

export { FindManyLogEmailArgs };
