import { ArgsType, Field } from "@nestjs/graphql";
import { GeoCityWhereUniqueInput } from "./GeoCityWhereUniqueInput";
import { GeoCityUpdateInput } from "./GeoCityUpdateInput";

@ArgsType()
class UpdateGeoCityArgs {
  @Field(() => GeoCityWhereUniqueInput, { nullable: false })
  where!: GeoCityWhereUniqueInput;
  @Field(() => GeoCityUpdateInput, { nullable: false })
  data!: GeoCityUpdateInput;
}

export { UpdateGeoCityArgs };
