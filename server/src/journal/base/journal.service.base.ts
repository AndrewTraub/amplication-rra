import { PrismaService } from "nestjs-prisma";

import {
  FindOneJournalArgs,
  FindManyJournalArgs,
  JournalCreateArgs,
  JournalUpdateArgs,
  JournalDeleteArgs,
  Subset,
  Journal,
  JournalAccount,
  Agent,
  JournalCategory,
  Registration,
  User,
} from "@prisma/client";

export class JournalServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends FindManyJournalArgs>(
    args: Subset<T, FindManyJournalArgs>
  ): Promise<Journal[]> {
    return this.prisma.journal.findMany(args);
  }
  async findOne<T extends FindOneJournalArgs>(
    args: Subset<T, FindOneJournalArgs>
  ): Promise<Journal | null> {
    return this.prisma.journal.findOne(args);
  }
  async create<T extends JournalCreateArgs>(
    args: Subset<T, JournalCreateArgs>
  ): Promise<Journal> {
    return this.prisma.journal.create<T>(args);
  }
  async update<T extends JournalUpdateArgs>(
    args: Subset<T, JournalUpdateArgs>
  ): Promise<Journal> {
    return this.prisma.journal.update<T>(args);
  }
  async delete<T extends JournalDeleteArgs>(
    args: Subset<T, JournalDeleteArgs>
  ): Promise<Journal> {
    return this.prisma.journal.delete(args);
  }

  async getAccount(parentId: string): Promise<JournalAccount | null> {
    return this.prisma.journal
      .findOne({
        where: { id: parentId },
      })
      .account();
  }

  async getAgent(parentId: string): Promise<Agent | null> {
    return this.prisma.journal
      .findOne({
        where: { id: parentId },
      })
      .agent();
  }

  async getCategory(parentId: string): Promise<JournalCategory | null> {
    return this.prisma.journal
      .findOne({
        where: { id: parentId },
      })
      .category();
  }

  async getRegistration(parentId: string): Promise<Registration | null> {
    return this.prisma.journal
      .findOne({
        where: { id: parentId },
      })
      .registration();
  }

  async getUser(parentId: string): Promise<User | null> {
    return this.prisma.journal
      .findOne({
        where: { id: parentId },
      })
      .user();
  }
}
