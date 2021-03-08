import { ArgsType, Field } from "@nestjs/graphql";
import { LogTextWhereUniqueInput } from "./LogTextWhereUniqueInput";

@ArgsType()
class DeleteLogTextArgs {
  @Field(() => LogTextWhereUniqueInput, { nullable: false })
  where!: LogTextWhereUniqueInput;
}

export { DeleteLogTextArgs };
