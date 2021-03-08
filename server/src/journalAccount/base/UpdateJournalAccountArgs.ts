import { ArgsType, Field } from "@nestjs/graphql";
import { JournalAccountWhereUniqueInput } from "./JournalAccountWhereUniqueInput";
import { JournalAccountUpdateInput } from "./JournalAccountUpdateInput";

@ArgsType()
class UpdateJournalAccountArgs {
  @Field(() => JournalAccountWhereUniqueInput, { nullable: false })
  where!: JournalAccountWhereUniqueInput;
  @Field(() => JournalAccountUpdateInput, { nullable: false })
  data!: JournalAccountUpdateInput;
}

export { UpdateJournalAccountArgs };
