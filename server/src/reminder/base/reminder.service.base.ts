import { PrismaService } from "nestjs-prisma";
import {
  FindOneReminderArgs,
  FindManyReminderArgs,
  ReminderCreateArgs,
  ReminderUpdateArgs,
  ReminderDeleteArgs,
  Subset,
} from "@prisma/client";

export class ReminderServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyReminderArgs>(
    args: Subset<T, FindManyReminderArgs>
  ) {
    return this.prisma.reminder.findMany(args);
  }
  findOne<T extends FindOneReminderArgs>(args: Subset<T, FindOneReminderArgs>) {
    return this.prisma.reminder.findOne(args);
  }
  create<T extends ReminderCreateArgs>(args: Subset<T, ReminderCreateArgs>) {
    return this.prisma.reminder.create<T>(args);
  }
  update<T extends ReminderUpdateArgs>(args: Subset<T, ReminderUpdateArgs>) {
    return this.prisma.reminder.update<T>(args);
  }
  delete<T extends ReminderDeleteArgs>(args: Subset<T, ReminderDeleteArgs>) {
    return this.prisma.reminder.delete(args);
  }
}
