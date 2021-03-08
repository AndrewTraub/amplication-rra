import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsOptional,
  IsString,
  IsInt,
  ValidateNested,
} from "class-validator";
import { EmailListWhereUniqueInput } from "../../emailList/base/EmailListWhereUniqueInput";
import { Type } from "class-transformer";
@InputType()
class EmailTemplateUpdateInput {
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
  body?: string;
  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  delay?: number;
  @ApiProperty({
    required: false,
    type: EmailListWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => EmailListWhereUniqueInput)
  @IsOptional()
  @Field(() => EmailListWhereUniqueInput, {
    nullable: true,
  })
  emailList?: EmailListWhereUniqueInput;
  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  sequenceNumber?: number;
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  title?: string | null;
}
export { EmailTemplateUpdateInput };
