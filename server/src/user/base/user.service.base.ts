import { PrismaService } from "nestjs-prisma";

import {
  FindOneUserArgs,
  FindManyUserArgs,
  UserCreateArgs,
  UserUpdateArgs,
  UserDeleteArgs,
  Subset,
  User,
  FindManyAffiliateStatArgs,
  AffiliateStat,
  FindManyAgentArgs,
  Agent,
  FindManyCompanyArgs,
  Company,
  FindManyDocumentArgs,
  Document,
  FindManyLogEmailArgs,
  LogEmail,
  FindManyJournalArgs,
  Journal,
  FindManyLogArgs,
  Log,
  FindManyEmailQueueArgs,
  EmailQueue,
  FindManyLogTextArgs,
  LogText,
} from "@prisma/client";

import { PasswordService } from "../../auth/password.service";
import { transformStringFieldUpdateInput } from "../../prisma.util";

export class UserServiceBase {
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly passwordService: PasswordService
  ) {}

  async findMany<T extends FindManyUserArgs>(
    args: Subset<T, FindManyUserArgs>
  ): Promise<User[]> {
    return this.prisma.user.findMany(args);
  }
  async findOne<T extends FindOneUserArgs>(
    args: Subset<T, FindOneUserArgs>
  ): Promise<User | null> {
    return this.prisma.user.findOne(args);
  }
  async create<T extends UserCreateArgs>(
    args: Subset<T, UserCreateArgs>
  ): Promise<User> {
    return this.prisma.user.create<T>({
      ...args,

      data: {
        ...args.data,
        password: await this.passwordService.hash(args.data.password),
      },
    });
  }
  async update<T extends UserUpdateArgs>(
    args: Subset<T, UserUpdateArgs>
  ): Promise<User> {
    return this.prisma.user.update<T>({
      ...args,

      data: {
        ...args.data,

        password:
          args.data.password &&
          (await transformStringFieldUpdateInput(
            args.data.password,
            (password) => this.passwordService.hash(password)
          )),
      },
    });
  }
  async delete<T extends UserDeleteArgs>(
    args: Subset<T, UserDeleteArgs>
  ): Promise<User> {
    return this.prisma.user.delete(args);
  }

  async findAffiliate(
    parentId: string,
    args: FindManyAffiliateStatArgs
  ): Promise<AffiliateStat[]> {
    return this.prisma.user
      .findOne({
        where: { id: parentId },
      })
      .affiliate(args);
  }

  async findAgent(parentId: string, args: FindManyAgentArgs): Promise<Agent[]> {
    return this.prisma.user
      .findOne({
        where: { id: parentId },
      })
      .agent(args);
  }

  async findCompany(
    parentId: string,
    args: FindManyCompanyArgs
  ): Promise<Company[]> {
    return this.prisma.user
      .findOne({
        where: { id: parentId },
      })
      .company(args);
  }

  async findDocument(
    parentId: string,
    args: FindManyDocumentArgs
  ): Promise<Document[]> {
    return this.prisma.user
      .findOne({
        where: { id: parentId },
      })
      .document(args);
  }

  async findEmailLog(
    parentId: string,
    args: FindManyLogEmailArgs
  ): Promise<LogEmail[]> {
    return this.prisma.user
      .findOne({
        where: { id: parentId },
      })
      .emailLog(args);
  }

  async findJournal(
    parentId: string,
    args: FindManyJournalArgs
  ): Promise<Journal[]> {
    return this.prisma.user
      .findOne({
        where: { id: parentId },
      })
      .journal(args);
  }

  async findLog(parentId: string, args: FindManyLogArgs): Promise<Log[]> {
    return this.prisma.user
      .findOne({
        where: { id: parentId },
      })
      .log(args);
  }

  async findQueue(
    parentId: string,
    args: FindManyEmailQueueArgs
  ): Promise<EmailQueue[]> {
    return this.prisma.user
      .findOne({
        where: { id: parentId },
      })
      .queue(args);
  }

  async findSmsLog(
    parentId: string,
    args: FindManyLogTextArgs
  ): Promise<LogText[]> {
    return this.prisma.user
      .findOne({
        where: { id: parentId },
      })
      .smsLog(args);
  }
}
