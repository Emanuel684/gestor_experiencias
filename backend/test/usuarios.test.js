const request = require("supertest");
const faker = require("faker");
const dateformat = require("dateformat");
const app = require("../app");
const Usuarios = require("../models/Usuarios");

describe("Validacion de las peticiones de los usuarios", () => {
  beforeEach(async () => {
    await Usuarios.deleteMany({});
  });

  afterEach(async () => {
    console.log("afterEach");
  });

  test("Verificar creacion de usuarios", async () => {
    await request(app)
      .post("/new-usuario")
      .send({
        nombres: "Viktor Manuel",
        apellidos: "Cardona Moncada",
        contrasena: "12345",
        correo_electronico: "viktormanuel@gmail.com",
      })
      .expect(200);
  });

  test("Verificar consulta de todos los usuarios", function (done) {
    request(app)
      .get("/all-usuarios")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  test("Cunsulta para eliminar un usuario", function (done) {
    request(app)
      .delete("/delete-usuario/603161a28385130f40d518cc")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  test("Actualizar la informacion de un usuario", async () => {
    await request(app)
      .put("/info-usuario/603161a28385130f40d518cc")
      .send({
        nombres: "Viktor Manuel",
        apellidos: "Cardona Moncada",
        contrasena: "12345",
        correo_electronico: "viktormanuel@gmail.com",
      })
      .expect(200);
  });
});
