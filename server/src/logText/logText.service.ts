import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { LogTextServiceBase } from "./base/logText.service.base";

@Injectable()
export class LogTextService extends LogTextServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
