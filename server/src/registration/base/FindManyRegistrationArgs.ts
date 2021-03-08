import { ArgsType, Field } from "@nestjs/graphql";
import { RegistrationWhereInput } from "./RegistrationWhereInput";

@ArgsType()
class FindManyRegistrationArgs {
  @Field(() => RegistrationWhereInput, { nullable: true })
  where?: RegistrationWhereInput;
}

export { FindManyRegistrationArgs };
