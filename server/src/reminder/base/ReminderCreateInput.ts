import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsOptional,
  IsString,
  IsInt,
  ValidateNested,
} from "class-validator";
import { StateWhereUniqueInput } from "../../state/base/StateWhereUniqueInput";
import { Type } from "class-transformer";
@InputType()
class ReminderCreateInput {
  @ApiProperty({
    required: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, {
    nullable: true,
  })
  active?: boolean | null;
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  body?: string | null;
  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  day?: number | null;
  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  month?: number | null;
  @ApiProperty({
    required: true,
    type: StateWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => StateWhereUniqueInput)
  @Field(() => StateWhereUniqueInput)
  state!: StateWhereUniqueInput;
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  title!: string;
}
export { ReminderCreateInput };
