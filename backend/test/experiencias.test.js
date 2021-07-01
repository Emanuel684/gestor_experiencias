const request = require("supertest");
const faker = require("faker");
const dateformat = require("dateformat");
const app = require("../app");
const Experiencias = require("../models/Experiencias");

describe("Validacion de las peticiones de las experiencias", () => {
  beforeEach(async () => {
    await Experiencias.deleteMany({});
  });

  afterEach(async () => {
    console.log("afterEach_Experiencia");
  });

  test("Verificar creacion de una experiencia", async () => {
    await request(app)
      .post("/")
      .send({
        titulo: "Creando cuerpos",
        descripcion:
          "Esta es la descripcion de como funciona la fisica del tiempo, esta descripcion es donde el usuario hablara sobre como funciona el tiempo y la leyes de la fisica que lo explican de una forma mas detallada.",
        sala_interactiva: "Tiempo, más allá del reloj",
        imagen_relacionada:
          "https://encasa.parqueexplora.org/wp-content/uploads/2021/04/THUMB-LIQUIDOS-QUE-ESCALAN-EN-CASA.png",
        public_id: "d2vwarrpzuxwlwgh464q",
        imagen:
          "http://res.cloudinary.com/dftuaxhsq/image/upload/v1625091388/d2vwarrpzuxwlwgh464q.png",
        id_usuario: null,
      })
      .expect(200);
  });

  test("Verificar consulta de todas las experiencias", function (done) {
    request(app)
      .get("/")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  test("Consultar los datos de una experiencia", function (done) {
    request(app)
      .get("/60dced7c743d7428c8aea2ba")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  test("Consultar todas las experiencias que existen de un usuario", function (done) {
    request(app)
      .get("/all-experiencias-usuario/60da92d3fc812533e8b679a3")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  test("Actualizar la informacion de una experiencia", async () => {
    await request(app)
      .put("/60dced7c743d7428c8aea2ba")
      .send({
        titulo: "Creando cuerpos",
        descripcion:
          "Esta es la descripcion de como funciona la fisica del tiempo, esta descripcion es donde el usuario hablara sobre como funciona el tiempo y la leyes de la fisica que lo explican de una forma mas detallada.",
        sala_interactiva: "Tiempo, más allá del reloj",
        imagen_relacionada:
          "https://encasa.parqueexplora.org/wp-content/uploads/2021/04/THUMB-LIQUIDOS-QUE-ESCALAN-EN-CASA.png",
        public_id: "d2vwarrpzuxwlwgh464q",
        imagen:
          "http://res.cloudinary.com/dftuaxhsq/image/upload/v1625091388/d2vwarrpzuxwlwgh464q.png",
        id_usuario: null,
      })
      .expect(200);
  });

  test("Eliminar una experiencia", function (done) {
    request(app)
      .delete("/60dced7c743d7428c8aea2ba")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
});
