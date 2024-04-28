const express = require("express");
const UserRoutes = express.Router();

const {
  registerLargo,
  registerUtil,
  registerWithRedirect,
  sendMailRedirect,
  resendCode,
  checkNewUser,
  login,
  autoLogin,
  changePassword,
  sendPassword,
  modifyPassword,
  update,
  getAll,
  byId,
  byName,
  byGender,
  changeRol,
} = require("../controllers/User.controllers");
const { upload } = require("../../middleware/files.middleware");
const {
  isAuth,
  isAuthAdmin,
  isAuthSuper,
} = require("../../middleware/auth.middleware");

//!------------------------------------------------------------------------
//?--------------------------------RUTAS SIN REDIRECT----------------------
//!------------------------------------------------------------------------

UserRoutes.post("/registerLargo", upload.single("image"), registerLargo);
UserRoutes.post("/registerUtil", upload.single("image"), registerUtil);
UserRoutes.post("/resend", resendCode);
UserRoutes.post("/check", checkNewUser);
UserRoutes.post("/login", login);
UserRoutes.post("/login/autologin", autoLogin);
UserRoutes.patch("/forgotpassword", changePassword);
UserRoutes.patch("/changepassword", [isAuth], modifyPassword);
UserRoutes.patch("/update/update", [isAuth], upload.single("image"), update);
UserRoutes.get("/", getAll);
UserRoutes.get("/finById/:id", byId);
UserRoutes.get("/finByName/:name", byName);
UserRoutes.get("/finByGender/:gender/:name", byGender);
UserRoutes.patch("/:idUser/rol/:newRol", [isAuthSuper], changeRol);

//!------------------------------------------------------------------------
//?--------------------------------RUTAS CON REDIRECT----------------------
//!------------------------------------------------------------------------
UserRoutes.post("/register", upload.single("image"), registerWithRedirect);

//!---------------- REDIRECT-------------------------------
UserRoutes.post("/register/sendMail/:id", sendMailRedirect);
UserRoutes.patch("/sendPassword/:id", sendPassword);

module.exports = UserRoutes;
