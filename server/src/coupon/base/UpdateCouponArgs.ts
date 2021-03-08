import { ArgsType, Field } from "@nestjs/graphql";
import { CouponWhereUniqueInput } from "./CouponWhereUniqueInput";
import { CouponUpdateInput } from "./CouponUpdateInput";

@ArgsType()
class UpdateCouponArgs {
  @Field(() => CouponWhereUniqueInput, { nullable: false })
  where!: CouponWhereUniqueInput;
  @Field(() => CouponUpdateInput, { nullable: false })
  data!: CouponUpdateInput;
}

export { UpdateCouponArgs };
