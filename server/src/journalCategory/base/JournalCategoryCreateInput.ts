import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { EnumJournalCategoryIncomeorexpense } from "./EnumJournalCategoryIncomeorexpense";
import { IsEnum, IsString, IsInt, IsOptional } from "class-validator";
@InputType()
class JournalCategoryCreateInput {
  @ApiProperty({
    required: true,
    enum: EnumJournalCategoryIncomeorexpense,
  })
  @IsEnum(EnumJournalCategoryIncomeorexpense)
  @Field(() => EnumJournalCategoryIncomeorexpense)
  incomeorexpense!: "Income" | "Expense";
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  name!: string;
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
export { JournalCategoryCreateInput };
