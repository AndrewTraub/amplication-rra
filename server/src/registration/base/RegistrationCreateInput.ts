import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsOptional,
  IsDate,
  ValidateNested,
  IsString,
  IsEnum,
} from "class-validator";
import { Type } from "class-transformer";
import { CompanyWhereUniqueInput } from "../../company/base/CompanyWhereUniqueInput";
import { EnumRegistrationMerchant } from "./EnumRegistrationMerchant";
import { EnumRegistrationPeriod } from "./EnumRegistrationPeriod";
import { EnumRegistrationStatus } from "./EnumRegistrationStatus";
@InputType()
class RegistrationCreateInput {
  @ApiProperty({
    required: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, {
    nullable: true,
  })
  automaticRenewal?: boolean | null;
  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  cancelledDate?: Date | null;
  @ApiProperty({
    required: true,
    type: CompanyWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CompanyWhereUniqueInput)
  @Field(() => CompanyWhereUniqueInput)
  companyId!: CompanyWhereUniqueInput;
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  dba?: string | null;
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  exp?: string | null;
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  four?: string | null;
  @ApiProperty({
    required: false,
    enum: EnumRegistrationMerchant,
  })
  @IsEnum(EnumRegistrationMerchant)
  @IsOptional()
  @Field(() => EnumRegistrationMerchant, {
    nullable: true,
  })
  merchant?: "AuthorizeNet" | "Paypal" | "Stripe" | null;
  @ApiProperty({
    required: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, {
    nullable: true,
  })
  noGracePeriod?: boolean | null;
  @ApiProperty({
    required: false,
    enum: EnumRegistrationPeriod,
  })
  @IsEnum(EnumRegistrationPeriod)
  @IsOptional()
  @Field(() => EnumRegistrationPeriod, {
    nullable: true,
  })
  period?: "Month" | "Year" | null;
  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  registeredDate?: Date | null;
  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  renewalDate?: Date | null;
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  state!: string;
  @ApiProperty({
    required: true,
    enum: EnumRegistrationStatus,
  })
  @IsEnum(EnumRegistrationStatus)
  @Field(() => EnumRegistrationStatus)
  status!: "Unregistered" | "Registered" | "Overdue" | "Cancelled";
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  subscriptionId?: string | null;
}
export { RegistrationCreateInput };
