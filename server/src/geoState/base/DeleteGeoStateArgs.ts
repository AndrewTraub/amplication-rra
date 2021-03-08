import { ArgsType, Field } from "@nestjs/graphql";
import { GeoStateWhereUniqueInput } from "./GeoStateWhereUniqueInput";

@ArgsType()
class DeleteGeoStateArgs {
  @Field(() => GeoStateWhereUniqueInput, { nullable: false })
  where!: GeoStateWhereUniqueInput;
}

export { DeleteGeoStateArgs };
