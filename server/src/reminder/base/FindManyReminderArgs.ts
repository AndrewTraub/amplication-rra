import { ArgsType, Field } from "@nestjs/graphql";
import { ReminderWhereInput } from "./ReminderWhereInput";

@ArgsType()
class FindManyReminderArgs {
  @Field(() => ReminderWhereInput, { nullable: true })
  where?: ReminderWhereInput;
}

export { FindManyReminderArgs };
