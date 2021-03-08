import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { AffiliateStatService } from "./affiliateStat.service";
import { AffiliateStatControllerBase } from "./base/affiliateStat.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("affiliate-stats")
@common.Controller("affiliate-stats")
export class AffiliateStatController extends AffiliateStatControllerBase {
  constructor(
    protected readonly service: AffiliateStatService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
