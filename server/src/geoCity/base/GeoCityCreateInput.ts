import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { GeoCountryWhereUniqueInput } from "../../geoCountry/base/GeoCountryWhereUniqueInput";
import { ValidateNested, IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";
import { GeoStateWhereUniqueInput } from "../../geoState/base/GeoStateWhereUniqueInput";
@InputType()
class GeoCityCreateInput {
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
    type: Number,
  })
  @IsNumber()
  @Field(() => Number)
  latitude!: number;
  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  @Field(() => Number)
  longitude!: number;
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  name!: string;
  @ApiProperty({
    required: true,
    type: GeoStateWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => GeoStateWhereUniqueInput)
  @Field(() => GeoStateWhereUniqueInput)
  state!: GeoStateWhereUniqueInput;
}
export { GeoCityCreateInput };
