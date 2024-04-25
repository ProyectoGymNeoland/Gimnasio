const express = require("express");
const dotenv = require("dotenv");
const { connect } = require("./src/utils/connectDB");

//? Creación servidor web:

const app = express();
dotenv.config();

//? Conexión con la base de datos:

connect();

//? Configuración cloudinary:

const { configCloudinary } = require("./src/middleware/files.middleware");
configCloudinary();
//! -----------------VARIABLES CONSTANTES --> PORT

const PORT = process.env.PORT;

//? CORS:

const cors = require("cors");
const { connect } = require("./src/utils/connectDB");

app.use(cors());

//? Limitaciones de cantidad en el back end:

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: false }));

//? Rutas:

//? ERRORES GENERALES Y RUTA NO ENCONTRADA:

app.use("*", (req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  return next(error);
});

app.use((error, req, res) => {
  return res
    .status(error.status || 500)
    .json(error.message || "unexpected error");
});

//? ESCUCHAMOS EN EL PUERTO EL SERVIDOR WEB:

app.disable("x-powered-by");
app.listen(PORT, () =>
  console.log(`Server listening on port 👌🔍 http://localhost:${PORT}`)
);
