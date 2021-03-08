import { ArgsType, Field } from "@nestjs/graphql";
import { JournalWhereUniqueInput } from "./JournalWhereUniqueInput";
import { JournalUpdateInput } from "./JournalUpdateInput";

@ArgsType()
class UpdateJournalArgs {
  @Field(() => JournalWhereUniqueInput, { nullable: false })
  where!: JournalWhereUniqueInput;
  @Field(() => JournalUpdateInput, { nullable: false })
  data!: JournalUpdateInput;
}

export { UpdateJournalArgs };
