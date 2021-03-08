import { ArgsType, Field } from "@nestjs/graphql";
import { PdfFormWhereUniqueInput } from "./PdfFormWhereUniqueInput";

@ArgsType()
class FindOnePdfFormArgs {
  @Field(() => PdfFormWhereUniqueInput, { nullable: false })
  where!: PdfFormWhereUniqueInput;
}

export { FindOnePdfFormArgs };
