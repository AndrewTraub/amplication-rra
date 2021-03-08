import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { GeoCountryWhereUniqueInput } from "../../geoCountry/base/GeoCountryWhereUniqueInput";
import { Transform, Type } from "class-transformer";
import {
  ValidateNested,
  IsOptional,
  IsString,
  IsNumber,
} from "class-validator";
import { GeoStateWhereUniqueInput } from "../../geoState/base/GeoStateWhereUniqueInput";
@InputType()
class GeoCityWhereInput {
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
  @Transform(JSON.parse)
  @ValidateNested()
  @Type(() => GeoStateWhereUniqueInput)
  @IsOptional()
  state?: GeoStateWhereUniqueInput;
}
export { GeoCityWhereInput };
