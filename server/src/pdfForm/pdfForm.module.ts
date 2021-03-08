import { Module } from "@nestjs/common";
import { PdfFormModuleBase } from "./base/pdfForm.module.base";
import { PdfFormService } from "./pdfForm.service";
import { PdfFormController } from "./pdfForm.controller";
import { PdfFormResolver } from "./pdfForm.resolver";

@Module({
  imports: [PdfFormModuleBase],
  controllers: [PdfFormController],
  providers: [PdfFormService, PdfFormResolver],
  exports: [PdfFormService],
})
export class PdfFormModule {}
