import { ArgsType, Field } from "@nestjs/graphql";
import { ReminderWhereUniqueInput } from "./ReminderWhereUniqueInput";
import { ReminderUpdateInput } from "./ReminderUpdateInput";

@ArgsType()
class UpdateReminderArgs {
  @Field(() => ReminderWhereUniqueInput, { nullable: false })
  where!: ReminderWhereUniqueInput;
  @Field(() => ReminderUpdateInput, { nullable: false })
  data!: ReminderUpdateInput;
}

export { UpdateReminderArgs };
