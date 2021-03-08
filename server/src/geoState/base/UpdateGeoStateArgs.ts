import { ArgsType, Field } from "@nestjs/graphql";
import { GeoStateWhereUniqueInput } from "./GeoStateWhereUniqueInput";
import { GeoStateUpdateInput } from "./GeoStateUpdateInput";

@ArgsType()
class UpdateGeoStateArgs {
  @Field(() => GeoStateWhereUniqueInput, { nullable: false })
  where!: GeoStateWhereUniqueInput;
  @Field(() => GeoStateUpdateInput, { nullable: false })
  data!: GeoStateUpdateInput;
}

export { UpdateGeoStateArgs };
