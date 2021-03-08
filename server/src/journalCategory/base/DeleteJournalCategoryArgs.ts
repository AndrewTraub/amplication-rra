import { ArgsType, Field } from "@nestjs/graphql";
import { JournalCategoryWhereUniqueInput } from "./JournalCategoryWhereUniqueInput";

@ArgsType()
class DeleteJournalCategoryArgs {
  @Field(() => JournalCategoryWhereUniqueInput, { nullable: false })
  where!: JournalCategoryWhereUniqueInput;
}

export { DeleteJournalCategoryArgs };
