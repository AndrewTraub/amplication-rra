import { ArgsType, Field } from "@nestjs/graphql";
import { DocumentWhereInput } from "./DocumentWhereInput";

@ArgsType()
class FindManyDocumentArgs {
  @Field(() => DocumentWhereInput, { nullable: true })
  where?: DocumentWhereInput;
}

export { FindManyDocumentArgs };
