import { ArgsType, Field } from "@nestjs/graphql";
import { AgentWhereUniqueInput } from "./AgentWhereUniqueInput";

@ArgsType()
class FindOneAgentArgs {
  @Field(() => AgentWhereUniqueInput, { nullable: false })
  where!: AgentWhereUniqueInput;
}

export { FindOneAgentArgs };
