//!------------------------------------------------------------------------------
//?----------------------CONEXION CON LA base de datos MONGO DB------------------
//!------------------------------------------------------------------------------

const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

const connect = async () => {
  try {
    const db = await mongoose.connect(MONGO_URI);

    // AHORA NOS VAMOS A TRAER EL HOST  y el NAME  de la DB --

    const { name, host } = db.connection;

    console.log(
      `Conectada la DB 👌  en el host: ${host} con el nombre: ${name}`
    );
  } catch (error) {
    console.log("No se ha conectado la db❌", error.message);
  }
};

module.exports = { connect };
