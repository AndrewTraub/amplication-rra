import { ArgsType, Field } from "@nestjs/graphql";
import { JournalCreateInput } from "./JournalCreateInput";

@ArgsType()
class CreateJournalArgs {
  @Field(() => JournalCreateInput, { nullable: false })
  data!: JournalCreateInput;
}

export { CreateJournalArgs };
