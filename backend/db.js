const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/gestor_tareas', {
    usedNewUrlParser: true
}).then(db => console.log('DB conectada.'))
.catch(error => console.log(error));