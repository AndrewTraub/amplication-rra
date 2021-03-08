import { ArgsType, Field } from "@nestjs/graphql";
import { ReminderCreateInput } from "./ReminderCreateInput";

@ArgsType()
class CreateReminderArgs {
  @Field(() => ReminderCreateInput, { nullable: false })
  data!: ReminderCreateInput;
}

export { CreateReminderArgs };
