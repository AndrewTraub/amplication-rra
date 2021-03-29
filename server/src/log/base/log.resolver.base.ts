import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateLogArgs } from "./CreateLogArgs";
import { UpdateLogArgs } from "./UpdateLogArgs";
import { DeleteLogArgs } from "./DeleteLogArgs";
import { FindManyLogArgs } from "./FindManyLogArgs";
import { FindOneLogArgs } from "./FindOneLogArgs";
import { Log } from "./Log";
import { User } from "../../user/base/User";
import { LogService } from "../log.service";

@graphql.Resolver(() => Log)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class LogResolverBase {
  constructor(
    protected readonly service: LogService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Log])
  @nestAccessControl.UseRoles({
    resource: "Log",
    action: "read",
    possession: "any",
  })
  async logs(
    @graphql.Args() args: FindManyLogArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Log[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Log",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Log, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Log",
    action: "read",
    possession: "own",
  })
  async log(
    @graphql.Args() args: FindOneLogArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Log | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Log",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Log)
  @nestAccessControl.UseRoles({
    resource: "Log",
    action: "create",
    possession: "any",
  })
  async createLog(
    @graphql.Args() args: CreateLogArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Log> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Log",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Log"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        user: args.data.user
          ? {
              connect: args.data.user,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => Log)
  @nestAccessControl.UseRoles({
    resource: "Log",
    action: "update",
    possession: "any",
  })
  async updateLog(
    @graphql.Args() args: UpdateLogArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Log | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Log",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Log"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          user: args.data.user
            ? {
                connect: args.data.user,
              }
            : undefined,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Log)
  @nestAccessControl.UseRoles({
    resource: "Log",
    action: "delete",
    possession: "any",
  })
  async deleteLog(@graphql.Args() args: DeleteLogArgs): Promise<Log | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.ResolveField(() => User, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Log",
    action: "read",
    possession: "any",
  })
  async user(
    @graphql.Parent() parent: Log,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<User | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "User",
    });
    const result = await this.service.getUser(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
