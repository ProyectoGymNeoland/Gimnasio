const express = require("express");
const dotenv = require("dotenv");
const { connect } = require("./src/utils/db");

// creamos el servidor web
const app = express();

// vamos a configurar dotenv para poder utilizar las variables d entorno del .env
dotenv.config();

//! conectamos con la base de datos
connect();

//! ----------------- CONFIGURAR CLOUDINARY--------
const { configCloudinary } = require("./src/middleware/files.middleware");

configCloudinary();

//! -----------------VARIABLES CONSTANTES --> PORT -

const PORT = process.env.PORT;

//! -----------------------CORS-------------
const cors = require("cors");
app.use(cors());

//! ------------------ limitaciones de cantidad en el back end
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: false }));

//! -----------------> RUTAS

const ActivitiesRoutes = require("./src/api/routes/Activities.routes");
app.use("/api/v1/activities/", ActivitiesRoutes);

const ActivityToDayRoutes = require("./src/api/routes/ActivityToDay.routes");
app.use("/api/v1/activityToDay/", ActivityToDayRoutes);

const DayRoutes = require("./src/api/routes/Day.routes");
app.use("/api/v1/day/", DayRoutes);

const MessageRoutes = require("./src/api/routes/Message.routes");
app.use("/api/v1/message/", MessageRoutes);

const UserRoutes = require("./src/api/routes/User.routes");
app.use("/api/v1/users/", UserRoutes);

const WallRoutes = require("./src/api/routes/Wall.routes");
app.use("/api/v1/wall/", WallRoutes);

const ContactRoutes =require("./src/api/routes/Contact.routes");
app.use("/api/v1/contact/", ContactRoutes);

const ReviewsRoutes = require("./src/api/routes/Reviews.routes");
app.use("/api/v1/reviews/", ReviewsRoutes);

const ChatRoutes = require("./src/api/routes/Chat.routes");
app.use("/api/v1/chat/", ChatRoutes);


//! --------------- generamos un error de cuando no see encuentre la ruta
app.use("*", (req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  return next(error);
});

//! ------------------> cuando el servidor crachea metemos un 500 ----------
app.use((error, req, res) => {
  return res
    .status(error.status || 500)
    .json(error.message || "unexpected error");
});

//! ------------------ ESCUCHAMOS EN EL PUERTO EL SERVIDOR WEB-----

// esto de aqui  nos revela con que tecnologia esta hecho nuestro back
app.disable("x-powered-by");
app.listen(PORT, () =>
  console.log(`Server listening on port 👌🔍 http://localhost:${PORT}`)
);
