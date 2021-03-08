import { PrismaService } from "nestjs-prisma";
import {
  FindOneStateArgs,
  FindManyStateArgs,
  StateCreateArgs,
  StateUpdateArgs,
  StateDeleteArgs,
  Subset,
} from "@prisma/client";

export class StateServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyStateArgs>(args: Subset<T, FindManyStateArgs>) {
    return this.prisma.state.findMany(args);
  }
  findOne<T extends FindOneStateArgs>(args: Subset<T, FindOneStateArgs>) {
    return this.prisma.state.findOne(args);
  }
  create<T extends StateCreateArgs>(args: Subset<T, StateCreateArgs>) {
    return this.prisma.state.create<T>(args);
  }
  update<T extends StateUpdateArgs>(args: Subset<T, StateUpdateArgs>) {
    return this.prisma.state.update<T>(args);
  }
  delete<T extends StateDeleteArgs>(args: Subset<T, StateDeleteArgs>) {
    return this.prisma.state.delete(args);
  }
}
