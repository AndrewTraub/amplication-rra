import { Module } from "@nestjs/common";
import { LogEmailModuleBase } from "./base/logEmail.module.base";
import { LogEmailService } from "./logEmail.service";
import { LogEmailController } from "./logEmail.controller";
import { LogEmailResolver } from "./logEmail.resolver";

@Module({
  imports: [LogEmailModuleBase],
  controllers: [LogEmailController],
  providers: [LogEmailService, LogEmailResolver],
  exports: [LogEmailService],
})
export class LogEmailModule {}
