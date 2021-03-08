import { Test } from "@nestjs/testing";
import { INestApplication, HttpStatus, ExecutionContext } from "@nestjs/common";
import request from "supertest";
import { MorganModule } from "nest-morgan";
import { ACGuard } from "nest-access-control";
import { BasicAuthGuard } from "../../auth/basicAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { RegistrationController } from "../registration.controller";
import { RegistrationService } from "../registration.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  automaticRenewal: "true",
  cancelledDate: new Date(),
  createdAt: new Date(),
  dba: "exampleDba",
  exp: "exampleExp",
  four: "exampleFour",
  id: "exampleId",
  noGracePeriod: "true",
  registeredDate: new Date(),
  renewalDate: new Date(),
  state: "exampleState",
  subscriptionId: "exampleSubscriptionId",
  updatedAt: new Date(),
};
const CREATE_RESULT = {
  automaticRenewal: "true",
  cancelledDate: new Date(),
  createdAt: new Date(),
  dba: "exampleDba",
  exp: "exampleExp",
  four: "exampleFour",
  id: "exampleId",
  noGracePeriod: "true",
  registeredDate: new Date(),
  renewalDate: new Date(),
  state: "exampleState",
  subscriptionId: "exampleSubscriptionId",
  updatedAt: new Date(),
};
const FIND_MANY_RESULT = [
  {
    automaticRenewal: "true",
    cancelledDate: new Date(),
    createdAt: new Date(),
    dba: "exampleDba",
    exp: "exampleExp",
    four: "exampleFour",
    id: "exampleId",
    noGracePeriod: "true",
    registeredDate: new Date(),
    renewalDate: new Date(),
    state: "exampleState",
    subscriptionId: "exampleSubscriptionId",
    updatedAt: new Date(),
  },
];
const FIND_ONE_RESULT = {
  automaticRenewal: "true",
  cancelledDate: new Date(),
  createdAt: new Date(),
  dba: "exampleDba",
  exp: "exampleExp",
  four: "exampleFour",
  id: "exampleId",
  noGracePeriod: "true",
  registeredDate: new Date(),
  renewalDate: new Date(),
  state: "exampleState",
  subscriptionId: "exampleSubscriptionId",
  updatedAt: new Date(),
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

describe("Registration", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: RegistrationService,
          useValue: service,
        },
      ],
      controllers: [RegistrationController],
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

  test("POST /registrations", async () => {
    await request(app.getHttpServer())
      .post("/registrations")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        cancelledDate: CREATE_RESULT.cancelledDate.toISOString(),
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        registeredDate: CREATE_RESULT.registeredDate.toISOString(),
        renewalDate: CREATE_RESULT.renewalDate.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /registrations", async () => {
    await request(app.getHttpServer())
      .get("/registrations")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          cancelledDate: FIND_MANY_RESULT[0].cancelledDate.toISOString(),
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          registeredDate: FIND_MANY_RESULT[0].registeredDate.toISOString(),
          renewalDate: FIND_MANY_RESULT[0].renewalDate.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /registrations/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/registrations"}/${nonExistingId}`)
      .expect(404)
      .expect({
        statusCode: 404,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /registrations/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/registrations"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        cancelledDate: FIND_ONE_RESULT.cancelledDate.toISOString(),
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        registeredDate: FIND_ONE_RESULT.registeredDate.toISOString(),
        renewalDate: FIND_ONE_RESULT.renewalDate.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
