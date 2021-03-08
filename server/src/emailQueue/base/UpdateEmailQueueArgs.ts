import { ArgsType, Field } from "@nestjs/graphql";
import { EmailQueueWhereUniqueInput } from "./EmailQueueWhereUniqueInput";
import { EmailQueueUpdateInput } from "./EmailQueueUpdateInput";

@ArgsType()
class UpdateEmailQueueArgs {
  @Field(() => EmailQueueWhereUniqueInput, { nullable: false })
  where!: EmailQueueWhereUniqueInput;
  @Field(() => EmailQueueUpdateInput, { nullable: false })
  data!: EmailQueueUpdateInput;
}

export { UpdateEmailQueueArgs };
