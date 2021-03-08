import { ArgsType, Field } from "@nestjs/graphql";
import { EmailQueueWhereUniqueInput } from "./EmailQueueWhereUniqueInput";

@ArgsType()
class FindOneEmailQueueArgs {
  @Field(() => EmailQueueWhereUniqueInput, { nullable: false })
  where!: EmailQueueWhereUniqueInput;
}

export { FindOneEmailQueueArgs };
