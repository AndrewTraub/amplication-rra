import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { GeoCountryServiceBase } from "./base/geoCountry.service.base";

@Injectable()
export class GeoCountryService extends GeoCountryServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
