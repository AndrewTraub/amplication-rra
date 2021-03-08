import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { EmailTemplateResolverBase } from "./base/emailTemplate.resolver.base";
import { EmailTemplate } from "./base/EmailTemplate";
import { EmailTemplateService } from "./emailTemplate.service";

@graphql.Resolver(() => EmailTemplate)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class EmailTemplateResolver extends EmailTemplateResolverBase {
  constructor(
    protected readonly service: EmailTemplateService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
