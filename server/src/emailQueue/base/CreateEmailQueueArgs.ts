import { ArgsType, Field } from "@nestjs/graphql";
import { EmailQueueCreateInput } from "./EmailQueueCreateInput";

@ArgsType()
class CreateEmailQueueArgs {
  @Field(() => EmailQueueCreateInput, { nullable: false })
  data!: EmailQueueCreateInput;
}

export { CreateEmailQueueArgs };
