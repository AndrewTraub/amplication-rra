import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { StateServiceBase } from "./base/state.service.base";

@Injectable()
export class StateService extends StateServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
