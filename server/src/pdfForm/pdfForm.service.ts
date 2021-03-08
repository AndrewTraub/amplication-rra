import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { PdfFormServiceBase } from "./base/pdfForm.service.base";

@Injectable()
export class PdfFormService extends PdfFormServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
