import { ArgsType, Field } from "@nestjs/graphql";
import { PdfFormWhereUniqueInput } from "./PdfFormWhereUniqueInput";

@ArgsType()
class DeletePdfFormArgs {
  @Field(() => PdfFormWhereUniqueInput, { nullable: false })
  where!: PdfFormWhereUniqueInput;
}

export { DeletePdfFormArgs };
