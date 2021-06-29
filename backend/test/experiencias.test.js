const request = require("supertest");
const faker = require("faker");
const dateformat = require("dateformat");
const app = require("../app");
const Tareas = require("../models/Tareas");

describe("Validacion de las peticiones de las tareas", () => {
  beforeEach(async () => {
    await Tareas.deleteMany({});
  });

  afterEach(async () => {
    console.log("afterEach_Tarea");
  });

  test("Verificar creacion de una tarea", async () => {
    await request(app)
      .post("/new-tarea")
      .send({
        nombre: "Matematicas",
        foto:
          "https://storage.googleapis.com/bucket-gestor-tareas/0a7e80a3-61ef-4c71-8f4d-2b1218130b90.jpg",
        prioridad: "Alta",
        fecha_vencimiento: "2021-03-21",
        id_usuario: null,
      })
      .expect(200);
  });

  test("Verificar consulta de todas las tareas", function (done) {
    request(app)
      .get("/all-tareas")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  test("Consultar los datos de una tarea", function (done) {
    request(app)
      .get("/tarea-upgrade-usuario/603161a28385130f40d518cc")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  test("Consultar todas las tareas que existen de un usuario para prioridad alta", function (done) {
    request(app)
      .get("/all-tareas-usuario-alta/603161a28385130f40d518cc")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  test("Consultar todas las tareas que existen de un usuario para prioridad media", function (done) {
    request(app)
      .get("/all-tareas-usuario-media/603161a28385130f40d518cc")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  test("Consultar todas las tareas que existen de un usuario para prioridad baja", function (done) {
    request(app)
      .get("/all-tareas-usuario-baja/603161a28385130f40d518cc")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  test("Actualizar la informacion de una tarea", async () => {
    await request(app)
      .put("/info-tarea/603161a28385130f40d518cc")
      .send({
        nombre: "Matematicas",
        foto:
          "https://storage.googleapis.com/bucket-gestor-tareas/0a7e80a3-61ef-4c71-8f4d-2b1218130b90.jpg",
        prioridad: "Alta",
        fecha_vencimiento: "2021-03-21",
        id_usuario: null,
      })
      .expect(200);
  });

  test("Eliminar una tarea", function (done) {
    request(app)
      .delete("/delete-tarea/603161a28385130f40d518cc")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
});
