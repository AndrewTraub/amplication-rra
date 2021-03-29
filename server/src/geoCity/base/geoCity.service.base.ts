import { PrismaService } from "nestjs-prisma";

import {
  FindOneGeoCityArgs,
  FindManyGeoCityArgs,
  GeoCityCreateArgs,
  GeoCityUpdateArgs,
  GeoCityDeleteArgs,
  Subset,
  GeoCity,
  GeoCountry,
  GeoState,
} from "@prisma/client";

export class GeoCityServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends FindManyGeoCityArgs>(
    args: Subset<T, FindManyGeoCityArgs>
  ): Promise<GeoCity[]> {
    return this.prisma.geoCity.findMany(args);
  }
  async findOne<T extends FindOneGeoCityArgs>(
    args: Subset<T, FindOneGeoCityArgs>
  ): Promise<GeoCity | null> {
    return this.prisma.geoCity.findOne(args);
  }
  async create<T extends GeoCityCreateArgs>(
    args: Subset<T, GeoCityCreateArgs>
  ): Promise<GeoCity> {
    return this.prisma.geoCity.create<T>(args);
  }
  async update<T extends GeoCityUpdateArgs>(
    args: Subset<T, GeoCityUpdateArgs>
  ): Promise<GeoCity> {
    return this.prisma.geoCity.update<T>(args);
  }
  async delete<T extends GeoCityDeleteArgs>(
    args: Subset<T, GeoCityDeleteArgs>
  ): Promise<GeoCity> {
    return this.prisma.geoCity.delete(args);
  }

  async getCountry(parentId: string): Promise<GeoCountry | null> {
    return this.prisma.geoCity
      .findOne({
        where: { id: parentId },
      })
      .country();
  }

  async getState(parentId: string): Promise<GeoState | null> {
    return this.prisma.geoCity
      .findOne({
        where: { id: parentId },
      })
      .state();
  }
}
