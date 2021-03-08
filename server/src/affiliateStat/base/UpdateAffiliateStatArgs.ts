import { ArgsType, Field } from "@nestjs/graphql";
import { AffiliateStatWhereUniqueInput } from "./AffiliateStatWhereUniqueInput";
import { AffiliateStatUpdateInput } from "./AffiliateStatUpdateInput";

@ArgsType()
class UpdateAffiliateStatArgs {
  @Field(() => AffiliateStatWhereUniqueInput, { nullable: false })
  where!: AffiliateStatWhereUniqueInput;
  @Field(() => AffiliateStatUpdateInput, { nullable: false })
  data!: AffiliateStatUpdateInput;
}

export { UpdateAffiliateStatArgs };
