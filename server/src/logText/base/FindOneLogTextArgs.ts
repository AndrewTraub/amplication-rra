import { ArgsType, Field } from "@nestjs/graphql";
import { LogTextWhereUniqueInput } from "./LogTextWhereUniqueInput";

@ArgsType()
class FindOneLogTextArgs {
  @Field(() => LogTextWhereUniqueInput, { nullable: false })
  where!: LogTextWhereUniqueInput;
}

export { FindOneLogTextArgs };
