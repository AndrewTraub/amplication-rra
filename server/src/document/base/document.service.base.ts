import { PrismaService } from "nestjs-prisma";
import {
  FindOneDocumentArgs,
  FindManyDocumentArgs,
  DocumentCreateArgs,
  DocumentUpdateArgs,
  DocumentDeleteArgs,
  Subset,
} from "@prisma/client";

export class DocumentServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyDocumentArgs>(
    args: Subset<T, FindManyDocumentArgs>
  ) {
    return this.prisma.document.findMany(args);
  }
  findOne<T extends FindOneDocumentArgs>(args: Subset<T, FindOneDocumentArgs>) {
    return this.prisma.document.findOne(args);
  }
  create<T extends DocumentCreateArgs>(args: Subset<T, DocumentCreateArgs>) {
    return this.prisma.document.create<T>(args);
  }
  update<T extends DocumentUpdateArgs>(args: Subset<T, DocumentUpdateArgs>) {
    return this.prisma.document.update<T>(args);
  }
  delete<T extends DocumentDeleteArgs>(args: Subset<T, DocumentDeleteArgs>) {
    return this.prisma.document.delete(args);
  }
}
