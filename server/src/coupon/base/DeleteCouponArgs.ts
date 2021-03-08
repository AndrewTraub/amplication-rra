import { ArgsType, Field } from "@nestjs/graphql";
import { CouponWhereUniqueInput } from "./CouponWhereUniqueInput";

@ArgsType()
class DeleteCouponArgs {
  @Field(() => CouponWhereUniqueInput, { nullable: false })
  where!: CouponWhereUniqueInput;
}

export { DeleteCouponArgs };
