import { ArgsType, Field } from "@nestjs/graphql";
import { CouponWhereInput } from "./CouponWhereInput";

@ArgsType()
class FindManyCouponArgs {
  @Field(() => CouponWhereInput, { nullable: true })
  where?: CouponWhereInput;
}

export { FindManyCouponArgs };
