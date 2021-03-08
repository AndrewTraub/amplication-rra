import { ArgsType, Field } from "@nestjs/graphql";
import { PdfFormWhereInput } from "./PdfFormWhereInput";

@ArgsType()
class FindManyPdfFormArgs {
  @Field(() => PdfFormWhereInput, { nullable: true })
  where?: PdfFormWhereInput;
}

export { FindManyPdfFormArgs };
