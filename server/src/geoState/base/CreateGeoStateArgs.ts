import { ArgsType, Field } from "@nestjs/graphql";
import { GeoStateCreateInput } from "./GeoStateCreateInput";

@ArgsType()
class CreateGeoStateArgs {
  @Field(() => GeoStateCreateInput, { nullable: false })
  data!: GeoStateCreateInput;
}

export { CreateGeoStateArgs };
