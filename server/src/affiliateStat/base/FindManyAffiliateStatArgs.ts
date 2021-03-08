import { ArgsType, Field } from "@nestjs/graphql";
import { AffiliateStatWhereInput } from "./AffiliateStatWhereInput";

@ArgsType()
class FindManyAffiliateStatArgs {
  @Field(() => AffiliateStatWhereInput, { nullable: true })
  where?: AffiliateStatWhereInput;
}

export { FindManyAffiliateStatArgs };
