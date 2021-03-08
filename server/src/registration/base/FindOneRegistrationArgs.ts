import { ArgsType, Field } from "@nestjs/graphql";
import { RegistrationWhereUniqueInput } from "./RegistrationWhereUniqueInput";

@ArgsType()
class FindOneRegistrationArgs {
  @Field(() => RegistrationWhereUniqueInput, { nullable: false })
  where!: RegistrationWhereUniqueInput;
}

export { FindOneRegistrationArgs };
