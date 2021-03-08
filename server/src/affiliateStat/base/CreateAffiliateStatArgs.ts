import { ArgsType, Field } from "@nestjs/graphql";
import { AffiliateStatCreateInput } from "./AffiliateStatCreateInput";

@ArgsType()
class CreateAffiliateStatArgs {
  @Field(() => AffiliateStatCreateInput, { nullable: false })
  data!: AffiliateStatCreateInput;
}

export { CreateAffiliateStatArgs };
