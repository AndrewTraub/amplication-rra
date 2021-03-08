import { ArgsType, Field } from "@nestjs/graphql";
import { JournalCategoryWhereUniqueInput } from "./JournalCategoryWhereUniqueInput";
import { JournalCategoryUpdateInput } from "./JournalCategoryUpdateInput";

@ArgsType()
class UpdateJournalCategoryArgs {
  @Field(() => JournalCategoryWhereUniqueInput, { nullable: false })
  where!: JournalCategoryWhereUniqueInput;
  @Field(() => JournalCategoryUpdateInput, { nullable: false })
  data!: JournalCategoryUpdateInput;
}

export { UpdateJournalCategoryArgs };
