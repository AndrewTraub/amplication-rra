import { ArgsType, Field } from "@nestjs/graphql";
import { JournalWhereInput } from "./JournalWhereInput";

@ArgsType()
class FindManyJournalArgs {
  @Field(() => JournalWhereInput, { nullable: true })
  where?: JournalWhereInput;
}

export { FindManyJournalArgs };
