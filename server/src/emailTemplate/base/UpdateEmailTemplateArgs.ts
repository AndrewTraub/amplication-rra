import { ArgsType, Field } from "@nestjs/graphql";
import { EmailTemplateWhereUniqueInput } from "./EmailTemplateWhereUniqueInput";
import { EmailTemplateUpdateInput } from "./EmailTemplateUpdateInput";

@ArgsType()
class UpdateEmailTemplateArgs {
  @Field(() => EmailTemplateWhereUniqueInput, { nullable: false })
  where!: EmailTemplateWhereUniqueInput;
  @Field(() => EmailTemplateUpdateInput, { nullable: false })
  data!: EmailTemplateUpdateInput;
}

export { UpdateEmailTemplateArgs };
