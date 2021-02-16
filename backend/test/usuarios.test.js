const request = require("supertest");
const faker = require("faker");
const dateformat = require("dateformat");
const app = require("../index");

describe("Pruebas para los servicios de usuarios", function () {
  it("Verificar creacion de usuarios", async () => {
    const res = await request(app).post("/usuarios/new-usuario").send({
      nombres: faker.name.firstName(),
      apellidos: faker.name.lastName(),
      contrasena: faker.internet.password(),
      correo: faker.internet.email(),
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("_id");
  });
});
