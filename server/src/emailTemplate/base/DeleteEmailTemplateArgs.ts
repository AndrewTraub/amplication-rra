import { ArgsType, Field } from "@nestjs/graphql";
import { EmailTemplateWhereUniqueInput } from "./EmailTemplateWhereUniqueInput";

@ArgsType()
class DeleteEmailTemplateArgs {
  @Field(() => EmailTemplateWhereUniqueInput, { nullable: false })
  where!: EmailTemplateWhereUniqueInput;
}

export { DeleteEmailTemplateArgs };
