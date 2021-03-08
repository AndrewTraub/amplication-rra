import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { GeoStateServiceBase } from "./base/geoState.service.base";

@Injectable()
export class GeoStateService extends GeoStateServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
