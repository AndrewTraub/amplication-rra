import { PrismaService } from "nestjs-prisma";

import {
  FindOneGeoStateArgs,
  FindManyGeoStateArgs,
  GeoStateCreateArgs,
  GeoStateUpdateArgs,
  GeoStateDeleteArgs,
  Subset,
  GeoState,
  FindManyGeoCityArgs,
  GeoCity,
  GeoCountry,
} from "@prisma/client";

export class GeoStateServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends FindManyGeoStateArgs>(
    args: Subset<T, FindManyGeoStateArgs>
  ): Promise<GeoState[]> {
    return this.prisma.geoState.findMany(args);
  }
  async findOne<T extends FindOneGeoStateArgs>(
    args: Subset<T, FindOneGeoStateArgs>
  ): Promise<GeoState | null> {
    return this.prisma.geoState.findOne(args);
  }
  async create<T extends GeoStateCreateArgs>(
    args: Subset<T, GeoStateCreateArgs>
  ): Promise<GeoState> {
    return this.prisma.geoState.create<T>(args);
  }
  async update<T extends GeoStateUpdateArgs>(
    args: Subset<T, GeoStateUpdateArgs>
  ): Promise<GeoState> {
    return this.prisma.geoState.update<T>(args);
  }
  async delete<T extends GeoStateDeleteArgs>(
    args: Subset<T, GeoStateDeleteArgs>
  ): Promise<GeoState> {
    return this.prisma.geoState.delete(args);
  }

  async findCity(
    parentId: string,
    args: FindManyGeoCityArgs
  ): Promise<GeoCity[]> {
    return this.prisma.geoState
      .findOne({
        where: { id: parentId },
      })
      .city(args);
  }

  async getCountry(parentId: string): Promise<GeoCountry | null> {
    return this.prisma.geoState
      .findOne({
        where: { id: parentId },
      })
      .country();
  }
}
