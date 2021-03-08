import { Test } from "@nestjs/testing";
import { INestApplication, HttpStatus, ExecutionContext } from "@nestjs/common";
import request from "supertest";
import { MorganModule } from "nest-morgan";
import { ACGuard } from "nest-access-control";
import { BasicAuthGuard } from "../../auth/basicAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { GeoCityController } from "../geoCity.controller";
import { GeoCityService } from "../geoCity.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  id: "exampleId",
  latitude: 42.42,
  longitude: 42.42,
  name: "exampleName",
};
const CREATE_RESULT = {
  id: "exampleId",
  latitude: 42.42,
  longitude: 42.42,
  name: "exampleName",
};
const FIND_MANY_RESULT = [
  {
    id: "exampleId",
    latitude: 42.42,
    longitude: 42.42,
    name: "exampleName",
  },
];
const FIND_ONE_RESULT = {
  id: "exampleId",
  latitude: 42.42,
  longitude: 42.42,
  name: "exampleName",
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

describe("GeoCity", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: GeoCityService,
          useValue: service,
        },
      ],
      controllers: [GeoCityController],
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

  test("POST /geo-cities", async () => {
    await request(app.getHttpServer())
      .post("/geo-cities")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect(CREATE_RESULT);
  });

  test("GET /geo-cities", async () => {
    await request(app.getHttpServer())
      .get("/geo-cities")
      .expect(HttpStatus.OK)
      .expect([FIND_MANY_RESULT[0]]);
  });

  test("GET /geo-cities/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/geo-cities"}/${nonExistingId}`)
      .expect(404)
      .expect({
        statusCode: 404,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /geo-cities/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/geo-cities"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect(FIND_ONE_RESULT);
  });

  afterAll(async () => {
    await app.close();
  });
});
