import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { GeoCountryWhereUniqueInput } from "../../geoCountry/base/GeoCountryWhereUniqueInput";
import { Transform, Type } from "class-transformer";
import { ValidateNested, IsOptional, IsString } from "class-validator";
@InputType()
class GeoStateWhereInput {
  @ApiProperty({
    required: false,
    type: GeoCountryWhereUniqueInput,
  })
  @Transform(JSON.parse)
  @ValidateNested()
  @Type(() => GeoCountryWhereUniqueInput)
  @IsOptional()
  country?: GeoCountryWhereUniqueInput;
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
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  name?: string;
}
export { GeoStateWhereInput };
