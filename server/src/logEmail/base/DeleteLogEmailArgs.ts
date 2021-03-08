import { ArgsType, Field } from "@nestjs/graphql";
import { LogEmailWhereUniqueInput } from "./LogEmailWhereUniqueInput";

@ArgsType()
class DeleteLogEmailArgs {
  @Field(() => LogEmailWhereUniqueInput, { nullable: false })
  where!: LogEmailWhereUniqueInput;
}

export { DeleteLogEmailArgs };
