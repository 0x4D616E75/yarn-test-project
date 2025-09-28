import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";

import { AppModule } from "@test-project/api/testing";


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
    expect(res.body).toEqual({
      success: true,
      data: {
        status: "OK",
        timestamp: expect.any(String),
      },
      timestamp: expect.any(String),
    });
    expect(new Date(res.body.timestamp).toString()).not.toBe("Invalid Date");
  });
});

describe("E2E: /users", () => {
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

  it("GET /users -> seeded users wrapped in ApiResponse", async () => {
    const res = await request(app.getHttpServer()).get("/users");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: true,
      data: expect.any(Array),
      timestamp: expect.any(String),
    });

    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(2);
    expect(new Date(res.body.timestamp).toString()).not.toBe("Invalid Date");

    for (const user of res.body.data) {
      expect(user).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          firstName: expect.any(String),
          lastName: expect.any(String),
          email: expect.any(String),
          fullName: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        })
      );

      expect(new Date(user.createdAt).toString()).not.toBe("Invalid Date");
      expect(new Date(user.updatedAt).toString()).not.toBe("Invalid Date");
    }
  });
});
