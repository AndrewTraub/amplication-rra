import { ArgsType, Field } from "@nestjs/graphql";
import { GeoStateWhereUniqueInput } from "./GeoStateWhereUniqueInput";

@ArgsType()
class FindOneGeoStateArgs {
  @Field(() => GeoStateWhereUniqueInput, { nullable: false })
  where!: GeoStateWhereUniqueInput;
}

export { FindOneGeoStateArgs };
