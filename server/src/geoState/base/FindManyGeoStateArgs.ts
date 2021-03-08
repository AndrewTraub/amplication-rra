import { ArgsType, Field } from "@nestjs/graphql";
import { GeoStateWhereInput } from "./GeoStateWhereInput";

@ArgsType()
class FindManyGeoStateArgs {
  @Field(() => GeoStateWhereInput, { nullable: true })
  where?: GeoStateWhereInput;
}

export { FindManyGeoStateArgs };
