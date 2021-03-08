import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { GeoCityServiceBase } from "./base/geoCity.service.base";

@Injectable()
export class GeoCityService extends GeoCityServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
