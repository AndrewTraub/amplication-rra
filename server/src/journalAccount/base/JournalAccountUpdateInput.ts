import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsEnum, IsNumber } from "class-validator";
import { EnumJournalAccountAssettype } from "./EnumJournalAccountAssettype";
@InputType()
class JournalAccountUpdateInput {
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  accountNumber?: string;
  @ApiProperty({
    required: false,
    enum: EnumJournalAccountAssettype,
  })
  @IsEnum(EnumJournalAccountAssettype)
  @IsOptional()
  @Field(() => EnumJournalAccountAssettype, {
    nullable: true,
  })
  assettype?:
    | "Asset"
    | "Liability"
    | "Equity"
    | "Receivable"
    | "Expense"
    | null;
  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  balance?: number | null;
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
}
export { JournalAccountUpdateInput };
