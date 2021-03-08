import { ArgsType, Field } from "@nestjs/graphql";
import { JournalAccountWhereInput } from "./JournalAccountWhereInput";

@ArgsType()
class FindManyJournalAccountArgs {
  @Field(() => JournalAccountWhereInput, { nullable: true })
  where?: JournalAccountWhereInput;
}

export { FindManyJournalAccountArgs };
