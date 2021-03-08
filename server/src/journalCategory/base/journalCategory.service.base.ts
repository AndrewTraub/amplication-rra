import { PrismaService } from "nestjs-prisma";
import {
  FindOneJournalCategoryArgs,
  FindManyJournalCategoryArgs,
  JournalCategoryCreateArgs,
  JournalCategoryUpdateArgs,
  JournalCategoryDeleteArgs,
  Subset,
} from "@prisma/client";

export class JournalCategoryServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyJournalCategoryArgs>(
    args: Subset<T, FindManyJournalCategoryArgs>
  ) {
    return this.prisma.journalCategory.findMany(args);
  }
  findOne<T extends FindOneJournalCategoryArgs>(
    args: Subset<T, FindOneJournalCategoryArgs>
  ) {
    return this.prisma.journalCategory.findOne(args);
  }
  create<T extends JournalCategoryCreateArgs>(
    args: Subset<T, JournalCategoryCreateArgs>
  ) {
    return this.prisma.journalCategory.create<T>(args);
  }
  update<T extends JournalCategoryUpdateArgs>(
    args: Subset<T, JournalCategoryUpdateArgs>
  ) {
    return this.prisma.journalCategory.update<T>(args);
  }
  delete<T extends JournalCategoryDeleteArgs>(
    args: Subset<T, JournalCategoryDeleteArgs>
  ) {
    return this.prisma.journalCategory.delete(args);
  }
}
