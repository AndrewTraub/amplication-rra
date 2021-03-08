import { ArgsType, Field } from "@nestjs/graphql";
import { LogWhereUniqueInput } from "./LogWhereUniqueInput";

@ArgsType()
class FindOneLogArgs {
  @Field(() => LogWhereUniqueInput, { nullable: false })
  where!: LogWhereUniqueInput;
}

export { FindOneLogArgs };
