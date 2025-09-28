import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";

import { AppModule } from "@test-project/api/testing";

// describe("E2E: /sum (uses shared-lib)", () => {
//   let app: INestApplication;

//   beforeAll(async () => {
//     const moduleRef: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = moduleRef.createNestApplication();
//     await app.init(); // wichtig für Supertest
//   });

//   afterAll(async () => {
//     await app.close();
//   });

//   it("GET /sum?a=2&b=5 -> { result: 7 }", async () => {
//     const res = await request(app.getHttpServer())
//       .get("/sum")
//       .query({ a: 2, b: 5 });

//     expect(res.status).toBe(200);
//     expect(res.body).toEqual({ result: 7 });
//   });
// });

describe("E2E: /health (optional)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("GET /health -> { ok: true }", async () => {
    const res = await request(app.getHttpServer()).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });
});
