import { ArgsType, Field } from "@nestjs/graphql";
import { EmailListWhereUniqueInput } from "./EmailListWhereUniqueInput";

@ArgsType()
class FindOneEmailListArgs {
  @Field(() => EmailListWhereUniqueInput, { nullable: false })
  where!: EmailListWhereUniqueInput;
}

export { FindOneEmailListArgs };
