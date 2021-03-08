import { Module } from "@nestjs/common";
import { JournalCategoryModuleBase } from "./base/journalCategory.module.base";
import { JournalCategoryService } from "./journalCategory.service";
import { JournalCategoryController } from "./journalCategory.controller";
import { JournalCategoryResolver } from "./journalCategory.resolver";

@Module({
  imports: [JournalCategoryModuleBase],
  controllers: [JournalCategoryController],
  providers: [JournalCategoryService, JournalCategoryResolver],
  exports: [JournalCategoryService],
})
export class JournalCategoryModule {}
