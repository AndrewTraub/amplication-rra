import { Module } from "@nestjs/common";
import { LogTextModuleBase } from "./base/logText.module.base";
import { LogTextService } from "./logText.service";
import { LogTextController } from "./logText.controller";
import { LogTextResolver } from "./logText.resolver";

@Module({
  imports: [LogTextModuleBase],
  controllers: [LogTextController],
  providers: [LogTextService, LogTextResolver],
  exports: [LogTextService],
})
export class LogTextModule {}
