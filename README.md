# Gestor de experiencias
Este proyecto fue creado como solución en el proceso de selección para desarrollador con Parque Explora; este proyecto busca ofrecer a sus usuarios la posibilidad de gestionar sus experiencias; para llegar a este objetivo, los usuarios pueden registrarse en la plataforma, al registrarse recibirán un correo, al igual que en cada inicio de sección; al encontrarse registrados, podrán registrar, editar o eliminar sus experiencias con Parque Explora.

## Tecnologías implementadas

### Backend
**Node.js:** En esta tecnología se encuentra todo el proyecto.

**Bcrypt:** Tecnología utilizada para la encriptación de la contraseña al registrarse un usuarios o iniciar sesión.

**Cloudinary:** Servicio utilizado para la gestión de imágenes pertenecientes a cada experiencia.

**Express:** Dependencia en la cual se encuentra desarrollado el backend.

**JsonWebToken:** Dependencia para el manejo del inicio de sesión, manteniendo la seguridad.

**Mongodb:** Dependencia para el control de los datos en la base de datos no relacional.

**Multer:** Dependencia para controlar el manejo de las imágenes en el backend.

**NodeMailer:** Dependencia para el envió de correos electrónicos a los usuarios.

**Body-parser:** Dependencia utilizada para el manejo del peso de las imágenes en el backend.

**Cors:** Controlador de los protocolos HTTP, permitiendo la comunicación correcta entre el frontend y el backend.

**Dotenv:** Dependencia para el manejo de variables de desarrollo.

**Morgan:** Dependencia para el manejo de errores en las peticiones HTTP en el entorno de desarrollo.

**Uuid:** Dependencia para el nombramiento de cada una de las imágenes.

**Jest:** Dependencia para el entorno de pruebas de las peticiones HTTP.

**Nodemon:** Demonio utilizado para la reinicializar del backend al realizar un cambio.

**Mongoose:** Dependencia para los modelos de la base de datos.

### Frontend
**Axios:** Tecnología implementada para la comunicación entre el frontend y el backend mediante las peticiones HTTP.

**Bootstrap:** Tecnología para el diseño del frontend.

**React-router-dom:** Dependencia para el control de las distintas rutas en el frontend.

**React.js:** Tecnología principal en el desarrollo del frontend.

## Pasos para el buen funcionamiento del frontend y el backend.

- Contar con Node.js y Mongodb instalado en el ordenador.
- Iniciar su servicio de Mongodb.
- Clonar el repositorio
- Dirigirse, con su consola de preferencia, a la carpeta backend.
- Correr el comando:
	> npm i
- Abra su editor de codigo favorito en la carpeta backend.
- En la carpete backend cree un archivo llamado '.env'.
- Dentro deel archivo creado digite lo siguiente:
  >CLOUDINARY_API_KEY=438695392893741

  >CLOUDINARY_API_SECRET=WoRDsNc5iaAMfI2r6r-R4cSsKtc

  >CLOUDINARY_NAME=dftuaxhsq

  >PORT=4040

  >MONGODB_URL_test=mongodb://"URL_DE_MONGODB"/gestor_experiencias
 
- Cambie la direccion del Mongodb para hacerlo coincidir con la suya.
- Posteriormente ejecutar el comando:
	> npm start
- Abra una nueva consola.
- Diríjase a la carpeta de frontend clonada.
- Digite el siguiente comando:
	>npm i
- Posteriormente digite el siguiente comando:
	>npm start
