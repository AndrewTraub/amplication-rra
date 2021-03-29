import { PrismaService } from "nestjs-prisma";

import {
  FindOneNotificationArgs,
  FindManyNotificationArgs,
  NotificationCreateArgs,
  NotificationUpdateArgs,
  NotificationDeleteArgs,
  Subset,
  Notification,
  FindManyLogEmailArgs,
  LogEmail,
  FindManyLogTextArgs,
  LogText,
  Registration,
} from "@prisma/client";

export class NotificationServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends FindManyNotificationArgs>(
    args: Subset<T, FindManyNotificationArgs>
  ): Promise<Notification[]> {
    return this.prisma.notification.findMany(args);
  }
  async findOne<T extends FindOneNotificationArgs>(
    args: Subset<T, FindOneNotificationArgs>
  ): Promise<Notification | null> {
    return this.prisma.notification.findOne(args);
  }
  async create<T extends NotificationCreateArgs>(
    args: Subset<T, NotificationCreateArgs>
  ): Promise<Notification> {
    return this.prisma.notification.create<T>(args);
  }
  async update<T extends NotificationUpdateArgs>(
    args: Subset<T, NotificationUpdateArgs>
  ): Promise<Notification> {
    return this.prisma.notification.update<T>(args);
  }
  async delete<T extends NotificationDeleteArgs>(
    args: Subset<T, NotificationDeleteArgs>
  ): Promise<Notification> {
    return this.prisma.notification.delete(args);
  }

  async findEmailLog(
    parentId: string,
    args: FindManyLogEmailArgs
  ): Promise<LogEmail[]> {
    return this.prisma.notification
      .findOne({
        where: { id: parentId },
      })
      .emailLog(args);
  }

  async findSmsLog(
    parentId: string,
    args: FindManyLogTextArgs
  ): Promise<LogText[]> {
    return this.prisma.notification
      .findOne({
        where: { id: parentId },
      })
      .smsLog(args);
  }

  async getRegistrationId(parentId: string): Promise<Registration | null> {
    return this.prisma.notification
      .findOne({
        where: { id: parentId },
      })
      .registrationId();
  }
}
