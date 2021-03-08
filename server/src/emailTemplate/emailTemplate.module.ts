import { Module } from "@nestjs/common";
import { EmailTemplateModuleBase } from "./base/emailTemplate.module.base";
import { EmailTemplateService } from "./emailTemplate.service";
import { EmailTemplateController } from "./emailTemplate.controller";
import { EmailTemplateResolver } from "./emailTemplate.resolver";

@Module({
  imports: [EmailTemplateModuleBase],
  controllers: [EmailTemplateController],
  providers: [EmailTemplateService, EmailTemplateResolver],
  exports: [EmailTemplateService],
})
export class EmailTemplateModule {}
