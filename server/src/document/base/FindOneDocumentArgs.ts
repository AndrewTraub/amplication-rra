import { ArgsType, Field } from "@nestjs/graphql";
import { DocumentWhereUniqueInput } from "./DocumentWhereUniqueInput";

@ArgsType()
class FindOneDocumentArgs {
  @Field(() => DocumentWhereUniqueInput, { nullable: false })
  where!: DocumentWhereUniqueInput;
}

export { FindOneDocumentArgs };
