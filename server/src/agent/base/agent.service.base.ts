import { PrismaService } from "nestjs-prisma";
import {
  FindOneAgentArgs,
  FindManyAgentArgs,
  AgentCreateArgs,
  AgentUpdateArgs,
  AgentDeleteArgs,
  Subset,
} from "@prisma/client";

export class AgentServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyAgentArgs>(args: Subset<T, FindManyAgentArgs>) {
    return this.prisma.agent.findMany(args);
  }
  findOne<T extends FindOneAgentArgs>(args: Subset<T, FindOneAgentArgs>) {
    return this.prisma.agent.findOne(args);
  }
  create<T extends AgentCreateArgs>(args: Subset<T, AgentCreateArgs>) {
    return this.prisma.agent.create<T>(args);
  }
  update<T extends AgentUpdateArgs>(args: Subset<T, AgentUpdateArgs>) {
    return this.prisma.agent.update<T>(args);
  }
  delete<T extends AgentDeleteArgs>(args: Subset<T, AgentDeleteArgs>) {
    return this.prisma.agent.delete(args);
  }
}
