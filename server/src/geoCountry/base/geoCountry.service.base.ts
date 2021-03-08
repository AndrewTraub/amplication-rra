import { PrismaService } from "nestjs-prisma";
import {
  FindOneGeoCountryArgs,
  FindManyGeoCountryArgs,
  GeoCountryCreateArgs,
  GeoCountryUpdateArgs,
  GeoCountryDeleteArgs,
  Subset,
} from "@prisma/client";

export class GeoCountryServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyGeoCountryArgs>(
    args: Subset<T, FindManyGeoCountryArgs>
  ) {
    return this.prisma.geoCountry.findMany(args);
  }
  findOne<T extends FindOneGeoCountryArgs>(
    args: Subset<T, FindOneGeoCountryArgs>
  ) {
    return this.prisma.geoCountry.findOne(args);
  }
  create<T extends GeoCountryCreateArgs>(
    args: Subset<T, GeoCountryCreateArgs>
  ) {
    return this.prisma.geoCountry.create<T>(args);
  }
  update<T extends GeoCountryUpdateArgs>(
    args: Subset<T, GeoCountryUpdateArgs>
  ) {
    return this.prisma.geoCountry.update<T>(args);
  }
  delete<T extends GeoCountryDeleteArgs>(
    args: Subset<T, GeoCountryDeleteArgs>
  ) {
    return this.prisma.geoCountry.delete(args);
  }
}
