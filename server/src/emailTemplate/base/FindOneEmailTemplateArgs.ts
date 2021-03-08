import { ArgsType, Field } from "@nestjs/graphql";
import { EmailTemplateWhereUniqueInput } from "./EmailTemplateWhereUniqueInput";

@ArgsType()
class FindOneEmailTemplateArgs {
  @Field(() => EmailTemplateWhereUniqueInput, { nullable: false })
  where!: EmailTemplateWhereUniqueInput;
}

export { FindOneEmailTemplateArgs };
