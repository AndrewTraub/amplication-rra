import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { GeoCountryWhereUniqueInput } from "../../geoCountry/base/GeoCountryWhereUniqueInput";
import { ValidateNested, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
@InputType()
class GeoStateUpdateInput {
  @ApiProperty({
    required: false,
    type: GeoCountryWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => GeoCountryWhereUniqueInput)
  @IsOptional()
  @Field(() => GeoCountryWhereUniqueInput, {
    nullable: true,
  })
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
  name?: string;
}
export { GeoStateUpdateInput };
