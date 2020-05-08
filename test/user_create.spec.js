const request = require("supertest");
const app = require("../src/app");

describe("REGISTER_USER", () => {
  it("deve ser capaz de criar um usuário", async () => {
    const response = await request(app).post("/users").send({
      name: "Bruno",
      surname: "Alcântara",
      email: "bruno@gmail.com",
      password: "12341234",
    });

    expect(response.body).toHaveProperty("_id", "name", "surname");
  });

  it("deve ser capaz de realizar login", async () => {
    const response = await request(app).post("/login").send({
      email: "bruno@gmail.com",
      password: "12341234",
    });

    expect(response.body).toHaveProperty("token");
  });
});
