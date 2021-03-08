import { Test } from "@nestjs/testing";
import { INestApplication, HttpStatus, ExecutionContext } from "@nestjs/common";
import request from "supertest";
import { MorganModule } from "nest-morgan";
import { ACGuard } from "nest-access-control";
import { BasicAuthGuard } from "../../auth/basicAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { CouponController } from "../coupon.controller";
import { CouponService } from "../coupon.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  amount: 42.42,
  coupon: "exampleCoupon",
  createdAt: new Date(),
  id: "exampleId",
  updatedAt: new Date(),
  validFrom: new Date(),
  validTo: new Date(),
};
const CREATE_RESULT = {
  amount: 42.42,
  coupon: "exampleCoupon",
  createdAt: new Date(),
  id: "exampleId",
  updatedAt: new Date(),
  validFrom: new Date(),
  validTo: new Date(),
};
const FIND_MANY_RESULT = [
  {
    amount: 42.42,
    coupon: "exampleCoupon",
    createdAt: new Date(),
    id: "exampleId",
    updatedAt: new Date(),
    validFrom: new Date(),
    validTo: new Date(),
  },
];
const FIND_ONE_RESULT = {
  amount: 42.42,
  coupon: "exampleCoupon",
  createdAt: new Date(),
  id: "exampleId",
  updatedAt: new Date(),
  validFrom: new Date(),
  validTo: new Date(),
};

const service = {
  create() {
    return CREATE_RESULT;
  },
  findMany: () => FIND_MANY_RESULT,
  findOne: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return null;
    }
  },
};

const basicAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const argumentHost = context.switchToHttp();
    const request = argumentHost.getRequest();
    request.user = {
      roles: ["user"],
    };
    return true;
  },
};

const acGuard = {
  canActivate: () => {
    return true;
  },
};

describe("Coupon", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: CouponService,
          useValue: service,
        },
      ],
      controllers: [CouponController],
      imports: [MorganModule.forRoot(), ACLModule],
    })
      .overrideGuard(BasicAuthGuard)
      .useValue(basicAuthGuard)
      .overrideGuard(ACGuard)
      .useValue(acGuard)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test("POST /coupons", async () => {
    await request(app.getHttpServer())
      .post("/coupons")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
        validFrom: CREATE_RESULT.validFrom.toISOString(),
        validTo: CREATE_RESULT.validTo.toISOString(),
      });
  });

  test("GET /coupons", async () => {
    await request(app.getHttpServer())
      .get("/coupons")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
          validFrom: FIND_MANY_RESULT[0].validFrom.toISOString(),
          validTo: FIND_MANY_RESULT[0].validTo.toISOString(),
        },
      ]);
  });

  test("GET /coupons/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/coupons"}/${nonExistingId}`)
      .expect(404)
      .expect({
        statusCode: 404,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /coupons/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/coupons"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
        validFrom: FIND_ONE_RESULT.validFrom.toISOString(),
        validTo: FIND_ONE_RESULT.validTo.toISOString(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
