import { Test } from "@nestjs/testing";
import { INestApplication, HttpStatus, ExecutionContext } from "@nestjs/common";
import request from "supertest";
import { MorganModule } from "nest-morgan";
import { ACGuard } from "nest-access-control";
import { BasicAuthGuard } from "../../auth/basicAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { PdfFormController } from "../pdfForm.controller";
import { PdfFormService } from "../pdfForm.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  createdAt: new Date(),
  id: "exampleId",
  mustAcceptRisk: "true",
  privateDescription: "examplePrivateDescription",
  provatefilename: "exampleProvatefilename",
  public: "true",
  publicDescription: "examplePublicDescription",
  publicName: "examplePublicName",
  updatedAt: new Date(),
  useRegistrationDate: "true",
};
const CREATE_RESULT = {
  createdAt: new Date(),
  id: "exampleId",
  mustAcceptRisk: "true",
  privateDescription: "examplePrivateDescription",
  provatefilename: "exampleProvatefilename",
  public: "true",
  publicDescription: "examplePublicDescription",
  publicName: "examplePublicName",
  updatedAt: new Date(),
  useRegistrationDate: "true",
};
const FIND_MANY_RESULT = [
  {
    createdAt: new Date(),
    id: "exampleId",
    mustAcceptRisk: "true",
    privateDescription: "examplePrivateDescription",
    provatefilename: "exampleProvatefilename",
    public: "true",
    publicDescription: "examplePublicDescription",
    publicName: "examplePublicName",
    updatedAt: new Date(),
    useRegistrationDate: "true",
  },
];
const FIND_ONE_RESULT = {
  createdAt: new Date(),
  id: "exampleId",
  mustAcceptRisk: "true",
  privateDescription: "examplePrivateDescription",
  provatefilename: "exampleProvatefilename",
  public: "true",
  publicDescription: "examplePublicDescription",
  publicName: "examplePublicName",
  updatedAt: new Date(),
  useRegistrationDate: "true",
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

describe("PdfForm", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: PdfFormService,
          useValue: service,
        },
      ],
      controllers: [PdfFormController],
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

  test("POST /pdf-forms", async () => {
    await request(app.getHttpServer())
      .post("/pdf-forms")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /pdf-forms", async () => {
    await request(app.getHttpServer())
      .get("/pdf-forms")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /pdf-forms/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/pdf-forms"}/${nonExistingId}`)
      .expect(404)
      .expect({
        statusCode: 404,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /pdf-forms/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/pdf-forms"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
