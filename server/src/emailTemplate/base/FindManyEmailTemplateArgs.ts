import { ArgsType, Field } from "@nestjs/graphql";
import { EmailTemplateWhereInput } from "./EmailTemplateWhereInput";

@ArgsType()
class FindManyEmailTemplateArgs {
  @Field(() => EmailTemplateWhereInput, { nullable: true })
  where?: EmailTemplateWhereInput;
}

export { FindManyEmailTemplateArgs };
