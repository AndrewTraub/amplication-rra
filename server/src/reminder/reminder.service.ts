import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { ReminderServiceBase } from "./base/reminder.service.base";

@Injectable()
export class ReminderService extends ReminderServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
