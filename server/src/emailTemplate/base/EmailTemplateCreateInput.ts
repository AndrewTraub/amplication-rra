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
class EmailTemplateCreateInput {
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
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  body!: string;
  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  delay!: number;
  @ApiProperty({
    required: true,
    type: EmailListWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => EmailListWhereUniqueInput)
  @Field(() => EmailListWhereUniqueInput)
  emailList!: EmailListWhereUniqueInput;
  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  sequenceNumber!: number;
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
export { EmailTemplateCreateInput };
