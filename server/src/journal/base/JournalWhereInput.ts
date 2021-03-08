import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { JournalAccountWhereUniqueInput } from "../../journalAccount/base/JournalAccountWhereUniqueInput";
import { Transform, Type } from "class-transformer";
import {
  ValidateNested,
  IsOptional,
  IsNumber,
  IsString,
  IsDate,
  IsEnum,
  IsBoolean,
} from "class-validator";
import { AgentWhereUniqueInput } from "../../agent/base/AgentWhereUniqueInput";
import { JournalCategoryWhereUniqueInput } from "../../journalCategory/base/JournalCategoryWhereUniqueInput";
import { EnumJournalDc } from "./EnumJournalDc";
import { EnumJournalJournaltype } from "./EnumJournalJournaltype";
import { RegistrationWhereUniqueInput } from "../../registration/base/RegistrationWhereUniqueInput";
import { UserWhereUniqueInput } from "../../user/base/UserWhereUniqueInput";
@InputType()
class JournalWhereInput {
  @ApiProperty({
    required: false,
    type: JournalAccountWhereUniqueInput,
  })
  @Transform(JSON.parse)
  @ValidateNested()
  @Type(() => JournalAccountWhereUniqueInput)
  @IsOptional()
  account?: JournalAccountWhereUniqueInput;
  @ApiProperty({
    required: false,
    type: AgentWhereUniqueInput,
  })
  @Transform(JSON.parse)
  @ValidateNested()
  @Type(() => AgentWhereUniqueInput)
  @IsOptional()
  agent?: AgentWhereUniqueInput | null;
  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  amount?: number;
  @ApiProperty({
    required: false,
    type: JournalCategoryWhereUniqueInput,
  })
  @Transform(JSON.parse)
  @ValidateNested()
  @Type(() => JournalCategoryWhereUniqueInput)
  @IsOptional()
  category?: JournalCategoryWhereUniqueInput | null;
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  comment?: string | null;
  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  createdAt?: Date;
  @ApiProperty({
    required: false,
    enum: EnumJournalDc,
  })
  @IsEnum(EnumJournalDc)
  @IsOptional()
  @Field(() => EnumJournalDc, {
    nullable: true,
  })
  dc?: "D" | "C";
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  description?: string | null;
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  id?: string;
  @ApiProperty({
    required: false,
    enum: EnumJournalJournaltype,
  })
  @IsEnum(EnumJournalJournaltype)
  @IsOptional()
  @Field(() => EnumJournalJournaltype, {
    nullable: true,
  })
  journaltype?: "Sj" | "Ap" | null;
  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  postDate?: Date | null;
  @ApiProperty({
    required: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, {
    nullable: true,
  })
  posted?: boolean | null;
  @ApiProperty({
    required: false,
    type: RegistrationWhereUniqueInput,
  })
  @Transform(JSON.parse)
  @ValidateNested()
  @Type(() => RegistrationWhereUniqueInput)
  @IsOptional()
  registration?: RegistrationWhereUniqueInput | null;
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  source?: string;
  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  transactionDate?: Date;
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  transactionId?: string | null;
  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  updatedAt?: Date;
  @ApiProperty({
    required: false,
    type: UserWhereUniqueInput,
  })
  @Transform(JSON.parse)
  @ValidateNested()
  @Type(() => UserWhereUniqueInput)
  @IsOptional()
  user?: UserWhereUniqueInput | null;
}
export { JournalWhereInput };
