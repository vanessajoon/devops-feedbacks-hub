const request = require("supertest");
const { app } = require("../server");

describe("Feedback Hub API", () => {
  test("GET / returns API message", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Feedback Hub API is running");
  });

  test("GET /health returns healthy status", async () => {
    const response = await request(app).get("/health");

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("healthy");
  });

  test("POST /api/feedback rejects missing fields", async () => {
    const response = await request(app)
      .post("/api/feedback")
      .send({ name: "Test User" });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Name and message are required");
  });
});
