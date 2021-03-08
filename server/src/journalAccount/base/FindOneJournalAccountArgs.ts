import { ArgsType, Field } from "@nestjs/graphql";
import { JournalAccountWhereUniqueInput } from "./JournalAccountWhereUniqueInput";

@ArgsType()
class FindOneJournalAccountArgs {
  @Field(() => JournalAccountWhereUniqueInput, { nullable: false })
  where!: JournalAccountWhereUniqueInput;
}

export { FindOneJournalAccountArgs };
