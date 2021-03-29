import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { JournalAccountWhereUniqueInput } from "../../journalAccount/base/JournalAccountWhereUniqueInput";
import {
  ValidateNested,
  IsOptional,
  IsNumber,
  IsString,
  IsDate,
  IsEnum,
  IsBoolean,
} from "class-validator";
import { Type } from "class-transformer";
import { AgentWhereUniqueInput } from "../../agent/base/AgentWhereUniqueInput";
import { JournalCategoryWhereUniqueInput } from "../../journalCategory/base/JournalCategoryWhereUniqueInput";
import { EnumJournalDc } from "./EnumJournalDc";
import { EnumJournalJournaltype } from "./EnumJournalJournaltype";
import { RegistrationWhereUniqueInput } from "../../registration/base/RegistrationWhereUniqueInput";
import { UserWhereUniqueInput } from "../../user/base/UserWhereUniqueInput";
@ObjectType()
class Journal {
  @ApiProperty({
    required: true,
    type: JournalAccountWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => JournalAccountWhereUniqueInput)
  account?: JournalAccountWhereUniqueInput;
  @ApiProperty({
    required: false,
    type: AgentWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => AgentWhereUniqueInput)
  @IsOptional()
  agent?: AgentWhereUniqueInput | null;
  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  @Field(() => Number)
  amount!: number;
  @ApiProperty({
    required: false,
    type: JournalCategoryWhereUniqueInput,
  })
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
  comment!: string | null;
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;
  @ApiProperty({
    required: true,
    enum: EnumJournalDc,
  })
  @IsEnum(EnumJournalDc)
  @Field(() => EnumJournalDc)
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
  description!: string | null;
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;
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
  postDate!: Date | null;
  @ApiProperty({
    required: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, {
    nullable: true,
  })
  posted!: boolean | null;
  @ApiProperty({
    required: false,
    type: RegistrationWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => RegistrationWhereUniqueInput)
  @IsOptional()
  registration?: RegistrationWhereUniqueInput | null;
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  source!: string;
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  transactionDate!: Date;
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  transactionId!: string | null;
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;
  @ApiProperty({
    required: false,
    type: UserWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => UserWhereUniqueInput)
  @IsOptional()
  user?: UserWhereUniqueInput | null;
}
export { Journal };
