require('./db');
const express = require('express');
const userRouter = require('./routes/usuarios');
const experienciasRouter = require('./routes/experiencias');
const app = express();
app.use(express.json());
app.use(userRouter);
app.use(experienciasRouter);


module.exports = app;