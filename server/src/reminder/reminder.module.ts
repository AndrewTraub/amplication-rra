import { Module } from "@nestjs/common";
import { ReminderModuleBase } from "./base/reminder.module.base";
import { ReminderService } from "./reminder.service";
import { ReminderController } from "./reminder.controller";
import { ReminderResolver } from "./reminder.resolver";

@Module({
  imports: [ReminderModuleBase],
  controllers: [ReminderController],
  providers: [ReminderService, ReminderResolver],
  exports: [ReminderService],
})
export class ReminderModule {}
