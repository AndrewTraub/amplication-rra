import { PrismaService } from "nestjs-prisma";
import {
  FindOnePdfFormArgs,
  FindManyPdfFormArgs,
  PdfFormCreateArgs,
  PdfFormUpdateArgs,
  PdfFormDeleteArgs,
  Subset,
} from "@prisma/client";

export class PdfFormServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyPdfFormArgs>(
    args: Subset<T, FindManyPdfFormArgs>
  ) {
    return this.prisma.pdfForm.findMany(args);
  }
  findOne<T extends FindOnePdfFormArgs>(args: Subset<T, FindOnePdfFormArgs>) {
    return this.prisma.pdfForm.findOne(args);
  }
  create<T extends PdfFormCreateArgs>(args: Subset<T, PdfFormCreateArgs>) {
    return this.prisma.pdfForm.create<T>(args);
  }
  update<T extends PdfFormUpdateArgs>(args: Subset<T, PdfFormUpdateArgs>) {
    return this.prisma.pdfForm.update<T>(args);
  }
  delete<T extends PdfFormDeleteArgs>(args: Subset<T, PdfFormDeleteArgs>) {
    return this.prisma.pdfForm.delete(args);
  }
}
