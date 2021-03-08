import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { LogEmailServiceBase } from "./base/logEmail.service.base";

@Injectable()
export class LogEmailService extends LogEmailServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
