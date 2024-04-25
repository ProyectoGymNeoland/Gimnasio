const nodemailer = require("nodemailer");
const validator = require("validator");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();

const randomCode = require("../../utils/randomCode");
const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const User = require("../models/User.model");

//!-------------------------------------------------------------
//?-------------------------REGISTER----------------------------
//!-------------------------------------------------------------
const registerWithRedirect = async (req, res, next) => {
  let catchImg = req.file?.path;
  try {
    await User.syncIndexes();
    let confirmationCode = randomCode();
    const { email, name } = req.body;
    const userExist = await User.findOne(
      { email: req.body.email },
      { name: req.body.name }
    );
    if (!userExist) {
      const newUser = new User({ ...req.body, confirmationCode });
      console.log(newUser);
      if (req.file) {
        newUser.image = req.file.path;
      } else {
        newUser.image = "https://pic.onlinewebfonts.com/svg/img_181369.png";
      }
      try {
        const userSave = await newUser.save();

        if (userSave) {
          return res.redirect(
            303,
            `http://localhost:8080/api/v1/users/register/sendMail/${userSave._id}`
          );
        }
      } catch (error) {
        return res.status(404).json(error.message);
      }
    } else {
      if (req.file) deleteImgCloudinary(catchImg);
      return res.status(409).json("this user already exist");
    }
  } catch (error) {
    if (req.file) deleteImgCloudinary(catchImg);
    return next(error);
  }
};

//!-------------------------------------------------------------
//?-------------------EMAIL DEL REGISTER (REDIRECT)-------------
//!-------------------------------------------------------------

const sendMailRedirect = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userDB = await User.findById(id);
    const emailEnv = process.env.EMAIL;
    const password = process.env.PASSWORD;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailEnv,
        pass: password,
      },
    });
    const mailOptions = {
      from: emailEnv,
      to: userDB.email,
      subject: "Codigo de confirmación",
      text: `Bienvenido ${userDB.name},su cuenta ha sido registrada en nuestra web.
          Su código para confirmar la cuenta es:${userDB.confirmationCode}`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(404).json({
          user: userDB,
          confirmationCode: "error, resend code",
        });
      } else {
        console.log("Email sent: " + info.response);
        return res.status(200).json({
          user: userDB,
          confirmationCode: userDB.confirmationCode,
        });
      }
    });
  } catch (error) {
    return next(error);
  }
};

//! --------------------------------------------------
//? ---------------------UPDATE-----------------------
//! --------------------------------------------------

const update = async (req, res, next) => {
  let catchImg = req.file?.path;
  try {
    await User.syncIndexes();
    const patchUser = new User(req.body);
    req.file && (patchUser.image = catchImg);
    patchUser._id = req.user._id;
    patchUser.password = req.user.password;
    patchUser.rol = req.user.rol;
    patchUser.confirmationCode = req.user.confirmationCode;
    patchUser.email = req.user.email;
    patchUser.check = req.user.check;
    patchUser.gender = req.user.gender;
    try {
      await User.findByIdAndUpdate(req.user._id, patchUser);
      if (req.file) deleteImgCloudinary(req.user.image);

      //* ++++++++++++++++++++++ TEST RUNTIME ++++++++++++++++++++++++++

      const updateUser = await User.findById(req.user._id);
      const updateKeys = Object.keys(req.body);
      const testUpdate = [];
      updateKeys.forEach((item) => {
        if (updateUser[item] === req.body[item]) {
          if (updateUser[item] != req.user[item]) {
            testUpdate.push({
              [item]: true,
            });
          } else {
            testUpdate.push({
              [item]: "sameOldInfo",
            });
          }
        } else {
          testUpdate.push({
            [item]: false,
          });
        }
      });

      if (req.file) {
        updateUser.image === catchImg
          ? testUpdate.push({
              image: true,
            })
          : testUpdate.push({
              image: false,
            });
      }
      return res.status(200).json({
        updateUser,
        testUpdate,
      });
    } catch (error) {
      if (req.file) deleteImgCloudinary(catchImg);
      return res.status(404).json(error.message);
    }
  } catch (error) {
    if (req.file) deleteImgCloudinary(catchImg);
    return next(error);
  }
};

module.exports = {
  registerWithRedirect,
  sendMailRedirect,
  update,
};
