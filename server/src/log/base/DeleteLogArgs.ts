import { ArgsType, Field } from "@nestjs/graphql";
import { LogWhereUniqueInput } from "./LogWhereUniqueInput";

@ArgsType()
class DeleteLogArgs {
  @Field(() => LogWhereUniqueInput, { nullable: false })
  where!: LogWhereUniqueInput;
}

export { DeleteLogArgs };
