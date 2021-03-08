import { ArgsType, Field } from "@nestjs/graphql";
import { ReminderWhereUniqueInput } from "./ReminderWhereUniqueInput";

@ArgsType()
class DeleteReminderArgs {
  @Field(() => ReminderWhereUniqueInput, { nullable: false })
  where!: ReminderWhereUniqueInput;
}

export { DeleteReminderArgs };
