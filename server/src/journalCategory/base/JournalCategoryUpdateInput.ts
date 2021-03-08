import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { EnumJournalCategoryIncomeorexpense } from "./EnumJournalCategoryIncomeorexpense";
import { IsEnum, IsOptional, IsString, IsInt } from "class-validator";
@InputType()
class JournalCategoryUpdateInput {
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
}
export { JournalCategoryUpdateInput };
