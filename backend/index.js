const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const app = express();

require("./db");

app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// BODY-PARSE
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

// routes
app.use("/usuarios", require("./routes/usuarios"));
app.use("/tareas", require("./routes/tareas"));

// Login con JWT

app.post("/api/login", async (req, res) => {
  const Usuarios = require("./models/Usuarios");
  const { correo_electronico, contrasena } = req.body;
  console.log("Correo electronico:", correo_electronico);
  console.log("Contrasena:", contrasena);
  try {
    const result = await Usuarios.find({
      correo_electronico: correo_electronico,
    });
    console.log(result);
    console.log(result[0]);
    if (result) {
      console.log(result[0]);
      const token = jwt.sign({ result }, "geek");
      res.json({ token });
    } else {
      res.json({ message: "Asegurese de ingresar los datos correctamente." });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "Asegurese de ingresar los datos correctamente." });
  }
});

app.get("/api/privada", verificarToken, (req, res) => {
  jwt.verify(req.token, "geek", (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        data,
      });
    }
  });
});

function verificarToken(req, res, next) {
  const bearerheader = req.headers["authorization"];
  console.log(bearerheader);
  if (typeof bearerheader !== "undefined") {
    const bearer = bearerheader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

// Fin Login

app.set("port", process.env.PORT || 4545);
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
