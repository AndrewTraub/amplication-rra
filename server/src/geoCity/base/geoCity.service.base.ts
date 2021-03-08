import { PrismaService } from "nestjs-prisma";
import {
  FindOneGeoCityArgs,
  FindManyGeoCityArgs,
  GeoCityCreateArgs,
  GeoCityUpdateArgs,
  GeoCityDeleteArgs,
  Subset,
} from "@prisma/client";

export class GeoCityServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyGeoCityArgs>(
    args: Subset<T, FindManyGeoCityArgs>
  ) {
    return this.prisma.geoCity.findMany(args);
  }
  findOne<T extends FindOneGeoCityArgs>(args: Subset<T, FindOneGeoCityArgs>) {
    return this.prisma.geoCity.findOne(args);
  }
  create<T extends GeoCityCreateArgs>(args: Subset<T, GeoCityCreateArgs>) {
    return this.prisma.geoCity.create<T>(args);
  }
  update<T extends GeoCityUpdateArgs>(args: Subset<T, GeoCityUpdateArgs>) {
    return this.prisma.geoCity.update<T>(args);
  }
  delete<T extends GeoCityDeleteArgs>(args: Subset<T, GeoCityDeleteArgs>) {
    return this.prisma.geoCity.delete(args);
  }
}
