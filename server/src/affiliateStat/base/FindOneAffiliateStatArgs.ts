import { ArgsType, Field } from "@nestjs/graphql";
import { AffiliateStatWhereUniqueInput } from "./AffiliateStatWhereUniqueInput";

@ArgsType()
class FindOneAffiliateStatArgs {
  @Field(() => AffiliateStatWhereUniqueInput, { nullable: false })
  where!: AffiliateStatWhereUniqueInput;
}

export { FindOneAffiliateStatArgs };
