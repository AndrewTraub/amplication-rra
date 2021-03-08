import { ArgsType, Field } from "@nestjs/graphql";
import { DocumentWhereUniqueInput } from "./DocumentWhereUniqueInput";
import { DocumentUpdateInput } from "./DocumentUpdateInput";

@ArgsType()
class UpdateDocumentArgs {
  @Field(() => DocumentWhereUniqueInput, { nullable: false })
  where!: DocumentWhereUniqueInput;
  @Field(() => DocumentUpdateInput, { nullable: false })
  data!: DocumentUpdateInput;
}

export { UpdateDocumentArgs };
