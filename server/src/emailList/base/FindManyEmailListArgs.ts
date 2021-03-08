import { ArgsType, Field } from "@nestjs/graphql";
import { EmailListWhereInput } from "./EmailListWhereInput";

@ArgsType()
class FindManyEmailListArgs {
  @Field(() => EmailListWhereInput, { nullable: true })
  where?: EmailListWhereInput;
}

export { FindManyEmailListArgs };
