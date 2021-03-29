import { PrismaService } from "nestjs-prisma";

import {
  FindOneJournalCategoryArgs,
  FindManyJournalCategoryArgs,
  JournalCategoryCreateArgs,
  JournalCategoryUpdateArgs,
  JournalCategoryDeleteArgs,
  Subset,
  JournalCategory,
  FindManyJournalArgs,
  Journal,
} from "@prisma/client";

export class JournalCategoryServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends FindManyJournalCategoryArgs>(
    args: Subset<T, FindManyJournalCategoryArgs>
  ): Promise<JournalCategory[]> {
    return this.prisma.journalCategory.findMany(args);
  }
  async findOne<T extends FindOneJournalCategoryArgs>(
    args: Subset<T, FindOneJournalCategoryArgs>
  ): Promise<JournalCategory | null> {
    return this.prisma.journalCategory.findOne(args);
  }
  async create<T extends JournalCategoryCreateArgs>(
    args: Subset<T, JournalCategoryCreateArgs>
  ): Promise<JournalCategory> {
    return this.prisma.journalCategory.create<T>(args);
  }
  async update<T extends JournalCategoryUpdateArgs>(
    args: Subset<T, JournalCategoryUpdateArgs>
  ): Promise<JournalCategory> {
    return this.prisma.journalCategory.update<T>(args);
  }
  async delete<T extends JournalCategoryDeleteArgs>(
    args: Subset<T, JournalCategoryDeleteArgs>
  ): Promise<JournalCategory> {
    return this.prisma.journalCategory.delete(args);
  }

  async findJournal(
    parentId: string,
    args: FindManyJournalArgs
  ): Promise<Journal[]> {
    return this.prisma.journalCategory
      .findOne({
        where: { id: parentId },
      })
      .journal(args);
  }
}
