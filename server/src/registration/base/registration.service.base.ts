import { PrismaService } from "nestjs-prisma";
import {
  FindOneRegistrationArgs,
  FindManyRegistrationArgs,
  RegistrationCreateArgs,
  RegistrationUpdateArgs,
  RegistrationDeleteArgs,
  Subset,
} from "@prisma/client";

export class RegistrationServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyRegistrationArgs>(
    args: Subset<T, FindManyRegistrationArgs>
  ) {
    return this.prisma.registration.findMany(args);
  }
  findOne<T extends FindOneRegistrationArgs>(
    args: Subset<T, FindOneRegistrationArgs>
  ) {
    return this.prisma.registration.findOne(args);
  }
  create<T extends RegistrationCreateArgs>(
    args: Subset<T, RegistrationCreateArgs>
  ) {
    return this.prisma.registration.create<T>(args);
  }
  update<T extends RegistrationUpdateArgs>(
    args: Subset<T, RegistrationUpdateArgs>
  ) {
    return this.prisma.registration.update<T>(args);
  }
  delete<T extends RegistrationDeleteArgs>(
    args: Subset<T, RegistrationDeleteArgs>
  ) {
    return this.prisma.registration.delete(args);
  }
}
