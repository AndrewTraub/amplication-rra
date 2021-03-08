import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { PdfFormService } from "./pdfForm.service";
import { PdfFormControllerBase } from "./base/pdfForm.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("pdf-forms")
@common.Controller("pdf-forms")
export class PdfFormController extends PdfFormControllerBase {
  constructor(
    protected readonly service: PdfFormService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
