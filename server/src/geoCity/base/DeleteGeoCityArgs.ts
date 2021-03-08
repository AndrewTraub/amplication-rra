import { ArgsType, Field } from "@nestjs/graphql";
import { GeoCityWhereUniqueInput } from "./GeoCityWhereUniqueInput";

@ArgsType()
class DeleteGeoCityArgs {
  @Field(() => GeoCityWhereUniqueInput, { nullable: false })
  where!: GeoCityWhereUniqueInput;
}

export { DeleteGeoCityArgs };
