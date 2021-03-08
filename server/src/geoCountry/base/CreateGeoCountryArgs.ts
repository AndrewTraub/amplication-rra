import { ArgsType, Field } from "@nestjs/graphql";
import { GeoCountryCreateInput } from "./GeoCountryCreateInput";

@ArgsType()
class CreateGeoCountryArgs {
  @Field(() => GeoCountryCreateInput, { nullable: false })
  data!: GeoCountryCreateInput;
}

export { CreateGeoCountryArgs };
