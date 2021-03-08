import { ArgsType, Field } from "@nestjs/graphql";
import { ReminderWhereUniqueInput } from "./ReminderWhereUniqueInput";

@ArgsType()
class FindOneReminderArgs {
  @Field(() => ReminderWhereUniqueInput, { nullable: false })
  where!: ReminderWhereUniqueInput;
}

export { FindOneReminderArgs };
