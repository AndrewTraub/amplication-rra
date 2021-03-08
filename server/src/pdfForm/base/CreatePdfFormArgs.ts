import { ArgsType, Field } from "@nestjs/graphql";
import { PdfFormCreateInput } from "./PdfFormCreateInput";

@ArgsType()
class CreatePdfFormArgs {
  @Field(() => PdfFormCreateInput, { nullable: false })
  data!: PdfFormCreateInput;
}

export { CreatePdfFormArgs };
