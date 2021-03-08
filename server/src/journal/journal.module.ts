import { Module } from "@nestjs/common";
import { JournalModuleBase } from "./base/journal.module.base";
import { JournalService } from "./journal.service";
import { JournalController } from "./journal.controller";
import { JournalResolver } from "./journal.resolver";

@Module({
  imports: [JournalModuleBase],
  controllers: [JournalController],
  providers: [JournalService, JournalResolver],
  exports: [JournalService],
})
export class JournalModule {}
