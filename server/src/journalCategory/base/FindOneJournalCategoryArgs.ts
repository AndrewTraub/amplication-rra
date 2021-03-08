import { ArgsType, Field } from "@nestjs/graphql";
import { JournalCategoryWhereUniqueInput } from "./JournalCategoryWhereUniqueInput";

@ArgsType()
class FindOneJournalCategoryArgs {
  @Field(() => JournalCategoryWhereUniqueInput, { nullable: false })
  where!: JournalCategoryWhereUniqueInput;
}

export { FindOneJournalCategoryArgs };
