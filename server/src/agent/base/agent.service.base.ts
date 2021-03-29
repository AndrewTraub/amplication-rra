import { PrismaService } from "nestjs-prisma";

import {
  FindOneAgentArgs,
  FindManyAgentArgs,
  AgentCreateArgs,
  AgentUpdateArgs,
  AgentDeleteArgs,
  Subset,
  Agent,
  FindManyDocumentArgs,
  Document,
  FindManyJournalArgs,
  Journal,
  State,
  User,
} from "@prisma/client";

export class AgentServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends FindManyAgentArgs>(
    args: Subset<T, FindManyAgentArgs>
  ): Promise<Agent[]> {
    return this.prisma.agent.findMany(args);
  }
  async findOne<T extends FindOneAgentArgs>(
    args: Subset<T, FindOneAgentArgs>
  ): Promise<Agent | null> {
    return this.prisma.agent.findOne(args);
  }
  async create<T extends AgentCreateArgs>(
    args: Subset<T, AgentCreateArgs>
  ): Promise<Agent> {
    return this.prisma.agent.create<T>(args);
  }
  async update<T extends AgentUpdateArgs>(
    args: Subset<T, AgentUpdateArgs>
  ): Promise<Agent> {
    return this.prisma.agent.update<T>(args);
  }
  async delete<T extends AgentDeleteArgs>(
    args: Subset<T, AgentDeleteArgs>
  ): Promise<Agent> {
    return this.prisma.agent.delete(args);
  }

  async findDocument(
    parentId: string,
    args: FindManyDocumentArgs
  ): Promise<Document[]> {
    return this.prisma.agent
      .findOne({
        where: { id: parentId },
      })
      .document(args);
  }

  async findJournal(
    parentId: string,
    args: FindManyJournalArgs
  ): Promise<Journal[]> {
    return this.prisma.agent
      .findOne({
        where: { id: parentId },
      })
      .journal(args);
  }

  async getState(parentId: string): Promise<State | null> {
    return this.prisma.agent
      .findOne({
        where: { id: parentId },
      })
      .state();
  }

  async getUser(parentId: string): Promise<User | null> {
    return this.prisma.agent
      .findOne({
        where: { id: parentId },
      })
      .user();
  }
}
