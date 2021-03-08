import { ArgsType, Field } from "@nestjs/graphql";
import { EmailQueueWhereInput } from "./EmailQueueWhereInput";

@ArgsType()
class FindManyEmailQueueArgs {
  @Field(() => EmailQueueWhereInput, { nullable: true })
  where?: EmailQueueWhereInput;
}

export { FindManyEmailQueueArgs };
