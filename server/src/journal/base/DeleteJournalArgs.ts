import { ArgsType, Field } from "@nestjs/graphql";
import { JournalWhereUniqueInput } from "./JournalWhereUniqueInput";

@ArgsType()
class DeleteJournalArgs {
  @Field(() => JournalWhereUniqueInput, { nullable: false })
  where!: JournalWhereUniqueInput;
}

export { DeleteJournalArgs };
