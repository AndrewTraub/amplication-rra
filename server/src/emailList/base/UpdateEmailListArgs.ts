import { ArgsType, Field } from "@nestjs/graphql";
import { EmailListWhereUniqueInput } from "./EmailListWhereUniqueInput";
import { EmailListUpdateInput } from "./EmailListUpdateInput";

@ArgsType()
class UpdateEmailListArgs {
  @Field(() => EmailListWhereUniqueInput, { nullable: false })
  where!: EmailListWhereUniqueInput;
  @Field(() => EmailListUpdateInput, { nullable: false })
  data!: EmailListUpdateInput;
}

export { UpdateEmailListArgs };
