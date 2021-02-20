require('./db');
const express = require('express');
const userRouter = require('./routes/usuarios');
const tareasRouter = require('./routes/tareas');
const app = express();
app.use(express.json());
app.use(userRouter);
app.use(tareasRouter);


module.exports = app;