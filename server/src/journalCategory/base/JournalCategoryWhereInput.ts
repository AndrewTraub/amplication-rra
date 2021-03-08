import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsOptional, IsString, IsEnum, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { EnumJournalCategoryIncomeorexpense } from "./EnumJournalCategoryIncomeorexpense";
@InputType()
class JournalCategoryWhereInput {
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
    enum: EnumJournalCategoryIncomeorexpense,
  })
  @IsEnum(EnumJournalCategoryIncomeorexpense)
  @IsOptional()
  @Field(() => EnumJournalCategoryIncomeorexpense, {
    nullable: true,
  })
  incomeorexpense?: "Income" | "Expense";
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  name?: string;
  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  sort?: number | null;
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
}
export { JournalCategoryWhereInput };
