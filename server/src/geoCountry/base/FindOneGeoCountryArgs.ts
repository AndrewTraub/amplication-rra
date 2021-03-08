import { ArgsType, Field } from "@nestjs/graphql";
import { GeoCountryWhereUniqueInput } from "./GeoCountryWhereUniqueInput";

@ArgsType()
class FindOneGeoCountryArgs {
  @Field(() => GeoCountryWhereUniqueInput, { nullable: false })
  where!: GeoCountryWhereUniqueInput;
}

export { FindOneGeoCountryArgs };
