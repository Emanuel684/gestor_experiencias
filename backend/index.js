const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
require('./db');

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// routes
app.use("/usuarios", require("./routes/usuarios"));
app.use("/tareas", require("./routes/tareas"));


app.set("port", process.env.PORT || 4545);
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
