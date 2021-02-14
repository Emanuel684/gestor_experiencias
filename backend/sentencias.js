// Insertar multiples elementos
db.alumnos.insert([
  {
    nombres: "Andrea",
    apellidos: "Lopez",
  },
  {
    nombres: "Carlos",
    apellidos: "Lopez",
  },
  {
    nombres: "Manuel",
    apellidos: "Lopez",
    genero: "Hombre",
  },
]);

// Insertar un solo elemento
db.alumnos.insert({
  nombres: "Santiago",
  apellidos: "Murillo",
});

// Buscar un alumno en especifico
db.alumnos.find({ _id: ObjectId("60197ca4df097888850e7d45") });

// Editar el registro de un alumno segun su id cambiando todo el registro
db.alumnos.update(
  { _id: ObjectId("60197ca4df097888850e7d45") },
  {
    nombres: "Emanuel",
    apellidos: "Acevedo",
    edad: 18,
  }
);

// Editar el registro de un alumno segun su id cambiando unicamente el campo que queremos
db.alumnos.update(
  { _id: ObjectId("60197ca4df097888850e7d45") },
  {
    $set: { edad: 21 },
  }
);

// Suma a la edad que el registro ya tiene 5
db.alumnos.update(
  { _id: ObjectId("60197ca4df097888850e7d45") },
  {
    $inc: { edad: 5 },
  }
);

// Eliminar el campor de un registro
db.alumnos.update(
  { _id: ObjectId("60197ca4df097888850e7d45") },
  {
    $unset: { edad: 26 },
  }
);

db.alumnos.update(
  { nombres: "Emanuel" },
  {
    nombres: "Emanuel",
    apellidos: "Cardona",
    edad: 26,
  }
);

db.alumnos.update(
  { nombres: "Daniela" },
  {
    nombres: "Daniela",
    apellidos: "Vega",
    edad: 19,
  },
  { upsert: true }
);

db.alumnos.update(
  { nombres: "Daniela" },
  {
    $rename: { nombres: "Diana" },
  }
);

// Elimina todos los registros con ese nombre
db.alumnos.remove({ nombres: "Manuel" });

// Elimina solo un registro
db.alumnos.remove({ nombres: "Manuel" }, { justOne: true });



db.alumnos.find(
    {$or: [{"nombres": "Carlos"}, {"nombres": "Emanuel"}]}
);



db.alumnos.find(
    { edad:19 }
);

// Mayores de 18
db.alumnos.find(
    { edad:{$gt:18} }
);

// Menores de 18
db.alumnos.find(
    { edad:{$lt:18} }
);


// Mayores a 17 y menores a 30
db.alumnos.find(
    { edad:{$gt:17, $lt:30} }
);



db.alumnos.insert([
    {
      nombres: "Carla",
      apellidos: "Lopez",
      genero: "M",
      materias: {
          lcastellana: 'Carlos Velez',
          matematicas: 'Pacho Calderon',
          quimica: "Jhannet Sanchez"
      }
    },
    {
      nombres: "Sol",
      apellidos: "Lopez",
      genero: "M",
      materias: {
        lcastellana: 'Carlos Velez',
        matematicas: 'Pacho Calderon'
    }
    },
    {
      nombres: "Vicktor",
      apellidos: "Rojo",
      genero: "H",
      materias: {
        lcastellana: 'Carlos Velez',
    }
    },
]);



db.alumnos.find(
    { "materias.lcastellana": "Carlos Velez" }
);


// El sort es para ordenar lo que nos envia segun el alfabeto asendente
db.alumnos.find().sort(
    { nombres: 1}
);

// El sort es para ordenar lo que nos envia segun el alfabeto desendente
db.alumnos.find().sort(
    { nombres: -1}
);



db.alumnos.count();


// Numero de personas mayores de edad
db.alumnos.find(
    { edad:{$gt:17}}
).count();

db.alumnos.find().limit(2);


db.alumnos.find().limit(2).sort({ nombres: -1});

db.alumnos.find().forEach(function(doc){ doc.nombres})