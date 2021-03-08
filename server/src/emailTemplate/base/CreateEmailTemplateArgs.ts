import { ArgsType, Field } from "@nestjs/graphql";
import { EmailTemplateCreateInput } from "./EmailTemplateCreateInput";

@ArgsType()
class CreateEmailTemplateArgs {
  @Field(() => EmailTemplateCreateInput, { nullable: false })
  data!: EmailTemplateCreateInput;
}

export { CreateEmailTemplateArgs };
