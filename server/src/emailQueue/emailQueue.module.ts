import { Module } from "@nestjs/common";
import { EmailQueueModuleBase } from "./base/emailQueue.module.base";
import { EmailQueueService } from "./emailQueue.service";
import { EmailQueueController } from "./emailQueue.controller";
import { EmailQueueResolver } from "./emailQueue.resolver";

@Module({
  imports: [EmailQueueModuleBase],
  controllers: [EmailQueueController],
  providers: [EmailQueueService, EmailQueueResolver],
  exports: [EmailQueueService],
})
export class EmailQueueModule {}
