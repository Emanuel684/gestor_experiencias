const request = require("supertest");
const faker = require("faker");
const dateformat = require("dateformat");
const app = require("../index");

describe("Pruebas para los servicios de tareas", function () {
  it("Verificar creacion de una tarea", async () => {
    const res = await request(app)
      .post("/tareas/new-tarea")
      .send({
        prioridad: faker.random.arrayElement(["Alta", "Media", "Baja"]),
        nombre: faker.name.firstName(),
        fecha_vencimiento: dateformat(faker.date.recent(), "yyyy-mm-d"),
        id_usuario: null,
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("_id");
  });
});
