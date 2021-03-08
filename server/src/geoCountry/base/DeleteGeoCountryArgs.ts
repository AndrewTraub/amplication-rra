import { ArgsType, Field } from "@nestjs/graphql";
import { GeoCountryWhereUniqueInput } from "./GeoCountryWhereUniqueInput";

@ArgsType()
class DeleteGeoCountryArgs {
  @Field(() => GeoCountryWhereUniqueInput, { nullable: false })
  where!: GeoCountryWhereUniqueInput;
}

export { DeleteGeoCountryArgs };
