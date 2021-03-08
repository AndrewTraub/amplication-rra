import { ArgsType, Field } from "@nestjs/graphql";
import { CouponWhereUniqueInput } from "./CouponWhereUniqueInput";

@ArgsType()
class FindOneCouponArgs {
  @Field(() => CouponWhereUniqueInput, { nullable: false })
  where!: CouponWhereUniqueInput;
}

export { FindOneCouponArgs };
