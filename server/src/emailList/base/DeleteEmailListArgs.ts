import { ArgsType, Field } from "@nestjs/graphql";
import { EmailListWhereUniqueInput } from "./EmailListWhereUniqueInput";

@ArgsType()
class DeleteEmailListArgs {
  @Field(() => EmailListWhereUniqueInput, { nullable: false })
  where!: EmailListWhereUniqueInput;
}

export { DeleteEmailListArgs };
