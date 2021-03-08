import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, ValidateNested, IsOptional, IsDate } from "class-validator";
import { NotificationWhereUniqueInput } from "../../notification/base/NotificationWhereUniqueInput";
import { Type } from "class-transformer";
import { RegistrationWhereUniqueInput } from "../../registration/base/RegistrationWhereUniqueInput";
import { UserWhereUniqueInput } from "../../user/base/UserWhereUniqueInput";
@InputType()
class LogTextCreateInput {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  message!: string;
  @ApiProperty({
    required: false,
    type: NotificationWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => NotificationWhereUniqueInput)
  @IsOptional()
  @Field(() => NotificationWhereUniqueInput, {
    nullable: true,
  })
  notification?: NotificationWhereUniqueInput | null;
  @ApiProperty({
    required: false,
    type: RegistrationWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => RegistrationWhereUniqueInput)
  @IsOptional()
  @Field(() => RegistrationWhereUniqueInput, {
    nullable: true,
  })
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
  response?: string | null;
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  sent!: Date;
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  sentBy!: string;
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  sentToNumber!: string;
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  smsTriggerReason?: string | null;
  @ApiProperty({
    required: false,
    type: UserWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => UserWhereUniqueInput)
  @IsOptional()
  @Field(() => UserWhereUniqueInput, {
    nullable: true,
  })
  user?: UserWhereUniqueInput | null;
}
export { LogTextCreateInput };
