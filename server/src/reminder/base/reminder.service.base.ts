import { PrismaService } from "nestjs-prisma";

import {
  FindOneReminderArgs,
  FindManyReminderArgs,
  ReminderCreateArgs,
  ReminderUpdateArgs,
  ReminderDeleteArgs,
  Subset,
  Reminder,
  State,
} from "@prisma/client";

export class ReminderServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends FindManyReminderArgs>(
    args: Subset<T, FindManyReminderArgs>
  ): Promise<Reminder[]> {
    return this.prisma.reminder.findMany(args);
  }
  async findOne<T extends FindOneReminderArgs>(
    args: Subset<T, FindOneReminderArgs>
  ): Promise<Reminder | null> {
    return this.prisma.reminder.findOne(args);
  }
  async create<T extends ReminderCreateArgs>(
    args: Subset<T, ReminderCreateArgs>
  ): Promise<Reminder> {
    return this.prisma.reminder.create<T>(args);
  }
  async update<T extends ReminderUpdateArgs>(
    args: Subset<T, ReminderUpdateArgs>
  ): Promise<Reminder> {
    return this.prisma.reminder.update<T>(args);
  }
  async delete<T extends ReminderDeleteArgs>(
    args: Subset<T, ReminderDeleteArgs>
  ): Promise<Reminder> {
    return this.prisma.reminder.delete(args);
  }

  async getState(parentId: string): Promise<State | null> {
    return this.prisma.reminder
      .findOne({
        where: { id: parentId },
      })
      .state();
  }
}
