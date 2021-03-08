import { ArgsType, Field } from "@nestjs/graphql";
import { GeoCityWhereInput } from "./GeoCityWhereInput";

@ArgsType()
class FindManyGeoCityArgs {
  @Field(() => GeoCityWhereInput, { nullable: true })
  where?: GeoCityWhereInput;
}

export { FindManyGeoCityArgs };
