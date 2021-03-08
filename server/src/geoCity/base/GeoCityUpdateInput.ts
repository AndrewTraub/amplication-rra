import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { GeoCountryWhereUniqueInput } from "../../geoCountry/base/GeoCountryWhereUniqueInput";
import {
  ValidateNested,
  IsOptional,
  IsNumber,
  IsString,
} from "class-validator";
import { Type } from "class-transformer";
import { GeoStateWhereUniqueInput } from "../../geoState/base/GeoStateWhereUniqueInput";
@InputType()
class GeoCityUpdateInput {
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
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  latitude?: number;
  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  longitude?: number;
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
  @ApiProperty({
    required: false,
    type: GeoStateWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => GeoStateWhereUniqueInput)
  @IsOptional()
  @Field(() => GeoStateWhereUniqueInput, {
    nullable: true,
  })
  state?: GeoStateWhereUniqueInput;
}
export { GeoCityUpdateInput };
