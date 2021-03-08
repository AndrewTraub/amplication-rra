import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { PdfFormResolverBase } from "./base/pdfForm.resolver.base";
import { PdfForm } from "./base/PdfForm";
import { PdfFormService } from "./pdfForm.service";

@graphql.Resolver(() => PdfForm)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class PdfFormResolver extends PdfFormResolverBase {
  constructor(
    protected readonly service: PdfFormService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
