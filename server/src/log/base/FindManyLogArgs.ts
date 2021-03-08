import { ArgsType, Field } from "@nestjs/graphql";
import { LogWhereInput } from "./LogWhereInput";

@ArgsType()
class FindManyLogArgs {
  @Field(() => LogWhereInput, { nullable: true })
  where?: LogWhereInput;
}

export { FindManyLogArgs };
