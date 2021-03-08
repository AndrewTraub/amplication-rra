import { ArgsType, Field } from "@nestjs/graphql";
import { JournalAccountCreateInput } from "./JournalAccountCreateInput";

@ArgsType()
class CreateJournalAccountArgs {
  @Field(() => JournalAccountCreateInput, { nullable: false })
  data!: JournalAccountCreateInput;
}

export { CreateJournalAccountArgs };
