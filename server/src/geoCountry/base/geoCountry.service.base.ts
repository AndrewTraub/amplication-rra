import { PrismaService } from "nestjs-prisma";

import {
  FindOneGeoCountryArgs,
  FindManyGeoCountryArgs,
  GeoCountryCreateArgs,
  GeoCountryUpdateArgs,
  GeoCountryDeleteArgs,
  Subset,
  GeoCountry,
  FindManyGeoCityArgs,
  GeoCity,
  FindManyGeoStateArgs,
  GeoState,
} from "@prisma/client";

export class GeoCountryServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends FindManyGeoCountryArgs>(
    args: Subset<T, FindManyGeoCountryArgs>
  ): Promise<GeoCountry[]> {
    return this.prisma.geoCountry.findMany(args);
  }
  async findOne<T extends FindOneGeoCountryArgs>(
    args: Subset<T, FindOneGeoCountryArgs>
  ): Promise<GeoCountry | null> {
    return this.prisma.geoCountry.findOne(args);
  }
  async create<T extends GeoCountryCreateArgs>(
    args: Subset<T, GeoCountryCreateArgs>
  ): Promise<GeoCountry> {
    return this.prisma.geoCountry.create<T>(args);
  }
  async update<T extends GeoCountryUpdateArgs>(
    args: Subset<T, GeoCountryUpdateArgs>
  ): Promise<GeoCountry> {
    return this.prisma.geoCountry.update<T>(args);
  }
  async delete<T extends GeoCountryDeleteArgs>(
    args: Subset<T, GeoCountryDeleteArgs>
  ): Promise<GeoCountry> {
    return this.prisma.geoCountry.delete(args);
  }

  async findCity(
    parentId: string,
    args: FindManyGeoCityArgs
  ): Promise<GeoCity[]> {
    return this.prisma.geoCountry
      .findOne({
        where: { id: parentId },
      })
      .city(args);
  }

  async findState(
    parentId: string,
    args: FindManyGeoStateArgs
  ): Promise<GeoState[]> {
    return this.prisma.geoCountry
      .findOne({
        where: { id: parentId },
      })
      .state(args);
  }
}
