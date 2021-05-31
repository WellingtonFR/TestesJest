const request = require("supertest");
const app = require("../../src/app");
const { User } = require("../../src/app/models");
const truncate = require("../utils/truncate");
const factory = require("../utils/factories");

describe("Authentication", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("deve autenticar com credenciais válidas", async () => {
    const user = await factory.create("User", {});

    console.log(user);

    const response = await request(app).post("/session").send({
      email: user.email,
      password: user.password,
    });

    expect(response.status).toBe(200);
  });

  it("não deve autenticar com credenciais inválidas", async () => {
    const user = await factory.create("User", {});

    const response = await request(app).post("/session").send({
      email: user.email,
      password: "1234",
    });

    expect(response.status).toBe(401);
  });

  it("deve retornar um jwt token quando retornar um usuário", async () => {
    const user = await factory.create("User", {});

    const response = await request(app).post("/session").send({
      email: user.email,
      password: user.password,
    });

    expect(response.body).toHaveProperty("token");
  });

  it("Deve acessar rotas privadas quando está autenticado", async () => {
    const user = await factory.create("User", {});

    const response = await request(app)
      .get("/painel")
      .set("Authorization", `Bearer ${user.gerarToken()}`);

    expect(response.status).toBe(200);
  });

  it("Não Deve acessar rotas privadas quando não está autenticado", async () => {
    const response = await request(app).get("/painel");

    expect(response.status).toBe(401);
  });

  it("Não Deve acessar rotas privadas quando o token é inválido", async () => {
    const response = await request(app)
      .get("/painel")
      .set("Authorization", "Bearer InvalidToken");

    expect(response.status).toBe(401);
  });
});
