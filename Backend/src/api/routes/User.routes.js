const express = require("express");
const UserRoutes = express.Router();
const { upload } = require("../../middleware/files.middleware");
const { isAuth } = require("../../middleware/auth.middleware");
const {
  sendMailRedirect,
  registerWithRedirect,
  update,
} = require("../controllers/User.controllers");

//! Rutas sin redirect :
UserRoutes.patch("/update/update", [isAuth], upload.single("image"), update);
//! Rutas con redirect :
UserRoutes.post("/register", upload.single("image"), registerWithRedirect);

//! Redirect :
UserRoutes.post("/register/sendMail/:id", sendMailRedirect);

module.exports = UserRoutes;
