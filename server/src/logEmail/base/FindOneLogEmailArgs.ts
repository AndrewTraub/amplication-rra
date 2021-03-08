import { ArgsType, Field } from "@nestjs/graphql";
import { LogEmailWhereUniqueInput } from "./LogEmailWhereUniqueInput";

@ArgsType()
class FindOneLogEmailArgs {
  @Field(() => LogEmailWhereUniqueInput, { nullable: false })
  where!: LogEmailWhereUniqueInput;
}

export { FindOneLogEmailArgs };
