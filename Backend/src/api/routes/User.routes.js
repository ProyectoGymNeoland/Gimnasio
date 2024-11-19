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
  deleteUser,
  byRol,
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
UserRoutes.post("/login/autoLogin", autoLogin);
UserRoutes.patch("/forgotPassword", changePassword);
UserRoutes.patch("/changePassword", [isAuth], modifyPassword);
UserRoutes.patch("/update/update", [isAuth], upload.single("image"), update);
UserRoutes.get("/", getAll);
UserRoutes.get("/findById/:id", byId);
UserRoutes.get("/findByName/:name", byName);
UserRoutes.post("/checkUsername", byName)
UserRoutes.get("/findByGender/:gender/:name", byGender);
UserRoutes.get("/findByRol/:rol",byRol);
UserRoutes.patch("/:idUser/rol/:newRol", [isAuthSuper], changeRol);
UserRoutes.delete("/:id", [isAuth], deleteUser);

//!------------------------------------------------------------------------
//?--------------------------------RUTAS CON REDIRECT----------------------
//!------------------------------------------------------------------------
UserRoutes.post("/register", upload.single("image"), registerWithRedirect);

//!---------------- REDIRECT-------------------------------
UserRoutes.post("/register/sendMail/:id", sendMailRedirect);
UserRoutes.patch("/sendPassword/:id", sendPassword);

module.exports = UserRoutes;
