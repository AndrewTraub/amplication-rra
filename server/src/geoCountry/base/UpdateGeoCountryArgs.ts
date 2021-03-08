import { ArgsType, Field } from "@nestjs/graphql";
import { GeoCountryWhereUniqueInput } from "./GeoCountryWhereUniqueInput";
import { GeoCountryUpdateInput } from "./GeoCountryUpdateInput";

@ArgsType()
class UpdateGeoCountryArgs {
  @Field(() => GeoCountryWhereUniqueInput, { nullable: false })
  where!: GeoCountryWhereUniqueInput;
  @Field(() => GeoCountryUpdateInput, { nullable: false })
  data!: GeoCountryUpdateInput;
}

export { UpdateGeoCountryArgs };
