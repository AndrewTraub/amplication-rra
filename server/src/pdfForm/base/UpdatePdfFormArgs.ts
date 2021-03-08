import { ArgsType, Field } from "@nestjs/graphql";
import { PdfFormWhereUniqueInput } from "./PdfFormWhereUniqueInput";
import { PdfFormUpdateInput } from "./PdfFormUpdateInput";

@ArgsType()
class UpdatePdfFormArgs {
  @Field(() => PdfFormWhereUniqueInput, { nullable: false })
  where!: PdfFormWhereUniqueInput;
  @Field(() => PdfFormUpdateInput, { nullable: false })
  data!: PdfFormUpdateInput;
}

export { UpdatePdfFormArgs };
