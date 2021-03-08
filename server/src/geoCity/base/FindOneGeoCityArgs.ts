import { ArgsType, Field } from "@nestjs/graphql";
import { GeoCityWhereUniqueInput } from "./GeoCityWhereUniqueInput";

@ArgsType()
class FindOneGeoCityArgs {
  @Field(() => GeoCityWhereUniqueInput, { nullable: false })
  where!: GeoCityWhereUniqueInput;
}

export { FindOneGeoCityArgs };
