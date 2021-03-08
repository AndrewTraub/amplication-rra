import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { GeoCountryWhereUniqueInput } from "../../geoCountry/base/GeoCountryWhereUniqueInput";
import { ValidateNested, IsString } from "class-validator";
import { Type } from "class-transformer";
@InputType()
class GeoStateCreateInput {
  @ApiProperty({
    required: true,
    type: GeoCountryWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => GeoCountryWhereUniqueInput)
  @Field(() => GeoCountryWhereUniqueInput)
  country!: GeoCountryWhereUniqueInput;
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  name!: string;
}
export { GeoStateCreateInput };
