import { ArgsType, Field } from "@nestjs/graphql";
import { DocumentWhereUniqueInput } from "./DocumentWhereUniqueInput";

@ArgsType()
class DeleteDocumentArgs {
  @Field(() => DocumentWhereUniqueInput, { nullable: false })
  where!: DocumentWhereUniqueInput;
}

export { DeleteDocumentArgs };
