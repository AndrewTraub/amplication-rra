import { PrismaService } from "nestjs-prisma";
import {
  FindOneGeoStateArgs,
  FindManyGeoStateArgs,
  GeoStateCreateArgs,
  GeoStateUpdateArgs,
  GeoStateDeleteArgs,
  Subset,
} from "@prisma/client";

export class GeoStateServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyGeoStateArgs>(
    args: Subset<T, FindManyGeoStateArgs>
  ) {
    return this.prisma.geoState.findMany(args);
  }
  findOne<T extends FindOneGeoStateArgs>(args: Subset<T, FindOneGeoStateArgs>) {
    return this.prisma.geoState.findOne(args);
  }
  create<T extends GeoStateCreateArgs>(args: Subset<T, GeoStateCreateArgs>) {
    return this.prisma.geoState.create<T>(args);
  }
  update<T extends GeoStateUpdateArgs>(args: Subset<T, GeoStateUpdateArgs>) {
    return this.prisma.geoState.update<T>(args);
  }
  delete<T extends GeoStateDeleteArgs>(args: Subset<T, GeoStateDeleteArgs>) {
    return this.prisma.geoState.delete(args);
  }
}
