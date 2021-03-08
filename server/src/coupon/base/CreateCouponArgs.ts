import { ArgsType, Field } from "@nestjs/graphql";
import { CouponCreateInput } from "./CouponCreateInput";

@ArgsType()
class CreateCouponArgs {
  @Field(() => CouponCreateInput, { nullable: false })
  data!: CouponCreateInput;
}

export { CreateCouponArgs };
