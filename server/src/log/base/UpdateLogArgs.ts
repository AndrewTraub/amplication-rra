import { ArgsType, Field } from "@nestjs/graphql";
import { LogWhereUniqueInput } from "./LogWhereUniqueInput";
import { LogUpdateInput } from "./LogUpdateInput";

@ArgsType()
class UpdateLogArgs {
  @Field(() => LogWhereUniqueInput, { nullable: false })
  where!: LogWhereUniqueInput;
  @Field(() => LogUpdateInput, { nullable: false })
  data!: LogUpdateInput;
}

export { UpdateLogArgs };
