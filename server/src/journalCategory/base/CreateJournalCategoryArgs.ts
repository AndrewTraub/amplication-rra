import { ArgsType, Field } from "@nestjs/graphql";
import { JournalCategoryCreateInput } from "./JournalCategoryCreateInput";

@ArgsType()
class CreateJournalCategoryArgs {
  @Field(() => JournalCategoryCreateInput, { nullable: false })
  data!: JournalCategoryCreateInput;
}

export { CreateJournalCategoryArgs };
