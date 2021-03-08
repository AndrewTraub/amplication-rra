import { PrismaService } from "nestjs-prisma";
import {
  FindOneJournalAccountArgs,
  FindManyJournalAccountArgs,
  JournalAccountCreateArgs,
  JournalAccountUpdateArgs,
  JournalAccountDeleteArgs,
  Subset,
} from "@prisma/client";

export class JournalAccountServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyJournalAccountArgs>(
    args: Subset<T, FindManyJournalAccountArgs>
  ) {
    return this.prisma.journalAccount.findMany(args);
  }
  findOne<T extends FindOneJournalAccountArgs>(
    args: Subset<T, FindOneJournalAccountArgs>
  ) {
    return this.prisma.journalAccount.findOne(args);
  }
  create<T extends JournalAccountCreateArgs>(
    args: Subset<T, JournalAccountCreateArgs>
  ) {
    return this.prisma.journalAccount.create<T>(args);
  }
  update<T extends JournalAccountUpdateArgs>(
    args: Subset<T, JournalAccountUpdateArgs>
  ) {
    return this.prisma.journalAccount.update<T>(args);
  }
  delete<T extends JournalAccountDeleteArgs>(
    args: Subset<T, JournalAccountDeleteArgs>
  ) {
    return this.prisma.journalAccount.delete(args);
  }
}
