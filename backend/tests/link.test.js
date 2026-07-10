const request = require("supertest");
const app = require("../src/app");

describe("Links API", () => {

  test("GET /api/links should return 200", async () => {

    const res = await request(app)
      .get("/api/links");

    expect(res.statusCode).toBe(200);

    expect(res.body.success).toBe(true);

  });

  test("POST /api/links creates new link", async () => {

  const res = await request(app)
    .post("/api/links")
    .send({
      title: "GitHub",
      originalUrl: "https://github.com",
      customAlias: "github-test"
    });

  expect(res.statusCode).toBe(201);

  expect(res.body.success).toBe(true);

});

test("GET link by id", async () => {

  const links = await request(app)
      .get("/api/links");

  const id = links.body.data[0].id;

  const res = await request(app)
      .get(`/api/links/${id}`);

  expect(res.statusCode).toBe(200);

});

test("DELETE link", async () => {

  const links = await request(app)
      .get("/api/links");

  const id = links.body.data[0].id;

  const res = await request(app)
      .delete(`/api/links/${id}`);

  expect(res.statusCode).toBe(200);

});

});