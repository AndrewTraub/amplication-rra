import { PrismaService } from "nestjs-prisma";

import {
  FindOnePdfFormArgs,
  FindManyPdfFormArgs,
  PdfFormCreateArgs,
  PdfFormUpdateArgs,
  PdfFormDeleteArgs,
  Subset,
  PdfForm,
  State,
} from "@prisma/client";

export class PdfFormServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends FindManyPdfFormArgs>(
    args: Subset<T, FindManyPdfFormArgs>
  ): Promise<PdfForm[]> {
    return this.prisma.pdfForm.findMany(args);
  }
  async findOne<T extends FindOnePdfFormArgs>(
    args: Subset<T, FindOnePdfFormArgs>
  ): Promise<PdfForm | null> {
    return this.prisma.pdfForm.findOne(args);
  }
  async create<T extends PdfFormCreateArgs>(
    args: Subset<T, PdfFormCreateArgs>
  ): Promise<PdfForm> {
    return this.prisma.pdfForm.create<T>(args);
  }
  async update<T extends PdfFormUpdateArgs>(
    args: Subset<T, PdfFormUpdateArgs>
  ): Promise<PdfForm> {
    return this.prisma.pdfForm.update<T>(args);
  }
  async delete<T extends PdfFormDeleteArgs>(
    args: Subset<T, PdfFormDeleteArgs>
  ): Promise<PdfForm> {
    return this.prisma.pdfForm.delete(args);
  }

  async getState(parentId: string): Promise<State | null> {
    return this.prisma.pdfForm
      .findOne({
        where: { id: parentId },
      })
      .state();
  }
}
