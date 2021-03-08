import { ArgsType, Field } from "@nestjs/graphql";
import { JournalAccountWhereUniqueInput } from "./JournalAccountWhereUniqueInput";

@ArgsType()
class DeleteJournalAccountArgs {
  @Field(() => JournalAccountWhereUniqueInput, { nullable: false })
  where!: JournalAccountWhereUniqueInput;
}

export { DeleteJournalAccountArgs };
