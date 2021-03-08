import { ArgsType, Field } from "@nestjs/graphql";
import { LogEmailWhereUniqueInput } from "./LogEmailWhereUniqueInput";
import { LogEmailUpdateInput } from "./LogEmailUpdateInput";

@ArgsType()
class UpdateLogEmailArgs {
  @Field(() => LogEmailWhereUniqueInput, { nullable: false })
  where!: LogEmailWhereUniqueInput;
  @Field(() => LogEmailUpdateInput, { nullable: false })
  data!: LogEmailUpdateInput;
}

export { UpdateLogEmailArgs };
