import { ArgsType, Field } from "@nestjs/graphql";
import { LogTextWhereUniqueInput } from "./LogTextWhereUniqueInput";
import { LogTextUpdateInput } from "./LogTextUpdateInput";

@ArgsType()
class UpdateLogTextArgs {
  @Field(() => LogTextWhereUniqueInput, { nullable: false })
  where!: LogTextWhereUniqueInput;
  @Field(() => LogTextUpdateInput, { nullable: false })
  data!: LogTextUpdateInput;
}

export { UpdateLogTextArgs };
