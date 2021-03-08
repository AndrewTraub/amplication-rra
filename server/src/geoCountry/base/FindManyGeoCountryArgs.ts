import { ArgsType, Field } from "@nestjs/graphql";
import { GeoCountryWhereInput } from "./GeoCountryWhereInput";

@ArgsType()
class FindManyGeoCountryArgs {
  @Field(() => GeoCountryWhereInput, { nullable: true })
  where?: GeoCountryWhereInput;
}

export { FindManyGeoCountryArgs };
