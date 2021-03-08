import { ArgsType, Field } from "@nestjs/graphql";
import { AffiliateStatWhereUniqueInput } from "./AffiliateStatWhereUniqueInput";

@ArgsType()
class DeleteAffiliateStatArgs {
  @Field(() => AffiliateStatWhereUniqueInput, { nullable: false })
  where!: AffiliateStatWhereUniqueInput;
}

export { DeleteAffiliateStatArgs };
