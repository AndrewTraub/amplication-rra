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
class CouponUpdateInput {
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
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  coupon?: string;
  @ApiProperty({
    required: false,
    enum: EnumCouponMinTerm,
  })
  @IsEnum(EnumCouponMinTerm)
  @IsOptional()
  @Field(() => EnumCouponMinTerm, {
    nullable: true,
  })
  minTerm?: "Month" | "Year";
  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  validFrom?: Date;
  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  validTo?: Date;
}
export { CouponUpdateInput };
