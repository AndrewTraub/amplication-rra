import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsNumber,
  IsOptional,
  IsString,
  IsEnum,
  IsDate,
} from "class-validator";
import { EnumCouponMinTerm } from "./EnumCouponMinTerm";
import { Type } from "class-transformer";
@InputType()
class CouponCreateInput {
  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  amount?: number | null;
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  coupon!: string;
  @ApiProperty({
    required: true,
    enum: EnumCouponMinTerm,
  })
  @IsEnum(EnumCouponMinTerm)
  @Field(() => EnumCouponMinTerm)
  minTerm!: "Month" | "Year";
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  validFrom!: Date;
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  validTo!: Date;
}
export { CouponCreateInput };
