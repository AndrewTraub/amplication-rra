import { Module } from "@nestjs/common";
import { JournalAccountModuleBase } from "./base/journalAccount.module.base";
import { JournalAccountService } from "./journalAccount.service";
import { JournalAccountController } from "./journalAccount.controller";
import { JournalAccountResolver } from "./journalAccount.resolver";

@Module({
  imports: [JournalAccountModuleBase],
  controllers: [JournalAccountController],
  providers: [JournalAccountService, JournalAccountResolver],
  exports: [JournalAccountService],
})
export class JournalAccountModule {}
