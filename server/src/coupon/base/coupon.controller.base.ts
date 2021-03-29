import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../../auth/basicAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { CouponService } from "../coupon.service";
import { CouponCreateInput } from "./CouponCreateInput";
import { CouponWhereInput } from "./CouponWhereInput";
import { CouponWhereUniqueInput } from "./CouponWhereUniqueInput";
import { CouponUpdateInput } from "./CouponUpdateInput";
import { Coupon } from "./Coupon";

export class CouponControllerBase {
  constructor(
    protected readonly service: CouponService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Coupon",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Coupon })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Query() query: {},
    @common.Body() data: CouponCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Coupon> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Coupon",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Coupon"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...query,
      data: data,
      select: {
        amount: true,
        coupon: true,
        createdAt: true,
        id: true,
        minTerm: true,
        updatedAt: true,
        validFrom: true,
        validTo: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Coupon",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Coupon] })
  @swagger.ApiForbiddenResponse()
  async findMany(
    @common.Query() query: CouponWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Coupon[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Coupon",
    });
    const results = await this.service.findMany({
      where: query,
      select: {
        amount: true,
        coupon: true,
        createdAt: true,
        id: true,
        minTerm: true,
        updatedAt: true,
        validFrom: true,
        validTo: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "Coupon",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Coupon })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Query() query: {},
    @common.Param() params: CouponWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Coupon | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Coupon",
    });
    const result = await this.service.findOne({
      ...query,
      where: params,
      select: {
        amount: true,
        coupon: true,
        createdAt: true,
        id: true,
        minTerm: true,
        updatedAt: true,
        validFrom: true,
        validTo: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return permission.filter(result);
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Patch("/:id")
  @nestAccessControl.UseRoles({
    resource: "Coupon",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Coupon })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Query() query: {},
    @common.Param() params: CouponWhereUniqueInput,
    @common.Body()
    data: CouponUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Coupon | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Coupon",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Coupon"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...query,
        where: params,
        data: data,
        select: {
          amount: true,
          coupon: true,
          createdAt: true,
          id: true,
          minTerm: true,
          updatedAt: true,
          validFrom: true,
          validTo: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Delete("/:id")
  @nestAccessControl.UseRoles({
    resource: "Coupon",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Coupon })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Query() query: {},
    @common.Param() params: CouponWhereUniqueInput
  ): Promise<Coupon | null> {
    try {
      return await this.service.delete({
        ...query,
        where: params,
        select: {
          amount: true,
          coupon: true,
          createdAt: true,
          id: true,
          minTerm: true,
          updatedAt: true,
          validFrom: true,
          validTo: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }
}
