import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateCouponArgs } from "./CreateCouponArgs";
import { UpdateCouponArgs } from "./UpdateCouponArgs";
import { DeleteCouponArgs } from "./DeleteCouponArgs";
import { FindManyCouponArgs } from "./FindManyCouponArgs";
import { FindOneCouponArgs } from "./FindOneCouponArgs";
import { Coupon } from "./Coupon";
import { CouponService } from "../coupon.service";

@graphql.Resolver(() => Coupon)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class CouponResolverBase {
  constructor(
    protected readonly service: CouponService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Coupon])
  @nestAccessControl.UseRoles({
    resource: "Coupon",
    action: "read",
    possession: "any",
  })
  async coupons(
    @graphql.Args() args: FindManyCouponArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Coupon[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Coupon",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Coupon, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Coupon",
    action: "read",
    possession: "own",
  })
  async coupon(
    @graphql.Args() args: FindOneCouponArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Coupon | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Coupon",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Coupon)
  @nestAccessControl.UseRoles({
    resource: "Coupon",
    action: "create",
    possession: "any",
  })
  async createCoupon(
    @graphql.Args() args: CreateCouponArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Coupon> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Coupon",
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
        `providing the properties: ${properties} on ${"Coupon"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Coupon)
  @nestAccessControl.UseRoles({
    resource: "Coupon",
    action: "update",
    possession: "any",
  })
  async updateCoupon(
    @graphql.Args() args: UpdateCouponArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Coupon | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Coupon",
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
        `providing the properties: ${properties} on ${"Coupon"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
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

  @graphql.Mutation(() => Coupon)
  @nestAccessControl.UseRoles({
    resource: "Coupon",
    action: "delete",
    possession: "any",
  })
  async deleteCoupon(
    @graphql.Args() args: DeleteCouponArgs
  ): Promise<Coupon | null> {
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
}
