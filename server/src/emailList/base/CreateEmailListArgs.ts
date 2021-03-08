import { ArgsType, Field } from "@nestjs/graphql";
import { EmailListCreateInput } from "./EmailListCreateInput";

@ArgsType()
class CreateEmailListArgs {
  @Field(() => EmailListCreateInput, { nullable: false })
  data!: EmailListCreateInput;
}

export { CreateEmailListArgs };
