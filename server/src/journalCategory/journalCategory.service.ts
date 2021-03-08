import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { JournalCategoryServiceBase } from "./base/journalCategory.service.base";

@Injectable()
export class JournalCategoryService extends JournalCategoryServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
