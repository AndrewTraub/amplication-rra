import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { JournalAccountServiceBase } from "./base/journalAccount.service.base";

@Injectable()
export class JournalAccountService extends JournalAccountServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
