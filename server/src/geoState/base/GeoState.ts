import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { GeoCountryWhereUniqueInput } from "../../geoCountry/base/GeoCountryWhereUniqueInput";
import { ValidateNested, IsString } from "class-validator";
import { Type } from "class-transformer";
@ObjectType()
class GeoState {
  @ApiProperty({
    required: true,
    type: GeoCountryWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => GeoCountryWhereUniqueInput)
  country?: GeoCountryWhereUniqueInput;
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  name!: string;
}
export { GeoState };
