import { ArgsType, Field } from "@nestjs/graphql";
import { AgentWhereInput } from "./AgentWhereInput";

@ArgsType()
class FindManyAgentArgs {
  @Field(() => AgentWhereInput, { nullable: true })
  where?: AgentWhereInput;
}

export { FindManyAgentArgs };
