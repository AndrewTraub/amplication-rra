import { PrismaService } from "nestjs-prisma";

import {
  FindOneJournalAccountArgs,
  FindManyJournalAccountArgs,
  JournalAccountCreateArgs,
  JournalAccountUpdateArgs,
  JournalAccountDeleteArgs,
  Subset,
  JournalAccount,
  FindManyJournalArgs,
  Journal,
} from "@prisma/client";

export class JournalAccountServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends FindManyJournalAccountArgs>(
    args: Subset<T, FindManyJournalAccountArgs>
  ): Promise<JournalAccount[]> {
    return this.prisma.journalAccount.findMany(args);
  }
  async findOne<T extends FindOneJournalAccountArgs>(
    args: Subset<T, FindOneJournalAccountArgs>
  ): Promise<JournalAccount | null> {
    return this.prisma.journalAccount.findOne(args);
  }
  async create<T extends JournalAccountCreateArgs>(
    args: Subset<T, JournalAccountCreateArgs>
  ): Promise<JournalAccount> {
    return this.prisma.journalAccount.create<T>(args);
  }
  async update<T extends JournalAccountUpdateArgs>(
    args: Subset<T, JournalAccountUpdateArgs>
  ): Promise<JournalAccount> {
    return this.prisma.journalAccount.update<T>(args);
  }
  async delete<T extends JournalAccountDeleteArgs>(
    args: Subset<T, JournalAccountDeleteArgs>
  ): Promise<JournalAccount> {
    return this.prisma.journalAccount.delete(args);
  }

  async findAccount(
    parentId: string,
    args: FindManyJournalArgs
  ): Promise<Journal[]> {
    return this.prisma.journalAccount
      .findOne({
        where: { id: parentId },
      })
      .account(args);
  }
}
