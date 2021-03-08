import { ArgsType, Field } from "@nestjs/graphql";
import { JournalCategoryWhereInput } from "./JournalCategoryWhereInput";

@ArgsType()
class FindManyJournalCategoryArgs {
  @Field(() => JournalCategoryWhereInput, { nullable: true })
  where?: JournalCategoryWhereInput;
}

export { FindManyJournalCategoryArgs };
