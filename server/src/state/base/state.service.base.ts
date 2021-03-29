import { PrismaService } from "nestjs-prisma";

import {
  FindOneStateArgs,
  FindManyStateArgs,
  StateCreateArgs,
  StateUpdateArgs,
  StateDeleteArgs,
  Subset,
  State,
  FindManyAgentArgs,
  Agent,
  FindManyPdfFormArgs,
  PdfForm,
  FindManyReminderArgs,
  Reminder,
} from "@prisma/client";

export class StateServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends FindManyStateArgs>(
    args: Subset<T, FindManyStateArgs>
  ): Promise<State[]> {
    return this.prisma.state.findMany(args);
  }
  async findOne<T extends FindOneStateArgs>(
    args: Subset<T, FindOneStateArgs>
  ): Promise<State | null> {
    return this.prisma.state.findOne(args);
  }
  async create<T extends StateCreateArgs>(
    args: Subset<T, StateCreateArgs>
  ): Promise<State> {
    return this.prisma.state.create<T>(args);
  }
  async update<T extends StateUpdateArgs>(
    args: Subset<T, StateUpdateArgs>
  ): Promise<State> {
    return this.prisma.state.update<T>(args);
  }
  async delete<T extends StateDeleteArgs>(
    args: Subset<T, StateDeleteArgs>
  ): Promise<State> {
    return this.prisma.state.delete(args);
  }

  async findAgent(parentId: string, args: FindManyAgentArgs): Promise<Agent[]> {
    return this.prisma.state
      .findOne({
        where: { id: parentId },
      })
      .agent(args);
  }

  async findForm(
    parentId: string,
    args: FindManyPdfFormArgs
  ): Promise<PdfForm[]> {
    return this.prisma.state
      .findOne({
        where: { id: parentId },
      })
      .form(args);
  }

  async findReminder(
    parentId: string,
    args: FindManyReminderArgs
  ): Promise<Reminder[]> {
    return this.prisma.state
      .findOne({
        where: { id: parentId },
      })
      .reminder(args);
  }
}
