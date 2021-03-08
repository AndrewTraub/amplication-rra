import { PrismaService } from "nestjs-prisma";
import {
  FindOneJournalArgs,
  FindManyJournalArgs,
  JournalCreateArgs,
  JournalUpdateArgs,
  JournalDeleteArgs,
  Subset,
} from "@prisma/client";

export class JournalServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyJournalArgs>(
    args: Subset<T, FindManyJournalArgs>
  ) {
    return this.prisma.journal.findMany(args);
  }
  findOne<T extends FindOneJournalArgs>(args: Subset<T, FindOneJournalArgs>) {
    return this.prisma.journal.findOne(args);
  }
  create<T extends JournalCreateArgs>(args: Subset<T, JournalCreateArgs>) {
    return this.prisma.journal.create<T>(args);
  }
  update<T extends JournalUpdateArgs>(args: Subset<T, JournalUpdateArgs>) {
    return this.prisma.journal.update<T>(args);
  }
  delete<T extends JournalDeleteArgs>(args: Subset<T, JournalDeleteArgs>) {
    return this.prisma.journal.delete(args);
  }
}
