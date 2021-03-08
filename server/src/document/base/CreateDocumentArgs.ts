import { ArgsType, Field } from "@nestjs/graphql";
import { DocumentCreateInput } from "./DocumentCreateInput";

@ArgsType()
class CreateDocumentArgs {
  @Field(() => DocumentCreateInput, { nullable: false })
  data!: DocumentCreateInput;
}

export { CreateDocumentArgs };
