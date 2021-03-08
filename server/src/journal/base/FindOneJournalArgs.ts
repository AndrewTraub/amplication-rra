import { ArgsType, Field } from "@nestjs/graphql";
import { JournalWhereUniqueInput } from "./JournalWhereUniqueInput";

@ArgsType()
class FindOneJournalArgs {
  @Field(() => JournalWhereUniqueInput, { nullable: false })
  where!: JournalWhereUniqueInput;
}

export { FindOneJournalArgs };
