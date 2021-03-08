import { ArgsType, Field } from "@nestjs/graphql";
import { EmailQueueWhereUniqueInput } from "./EmailQueueWhereUniqueInput";

@ArgsType()
class DeleteEmailQueueArgs {
  @Field(() => EmailQueueWhereUniqueInput, { nullable: false })
  where!: EmailQueueWhereUniqueInput;
}

export { DeleteEmailQueueArgs };
