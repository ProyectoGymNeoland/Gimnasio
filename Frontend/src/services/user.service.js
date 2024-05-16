import { updateToken } from '../utils';
import { APIGym } from './gym.config';

//! ---------- REGISTER USER ---------- //

export const registerUser = async (formData) => {
    return APIGym.post("/users/registerLargo", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => res)
      .catch((error) => error);
  };

//! ---------- LOGIN USER ---------- //

export const loginUserService = async (formData) => {
    return APIGym.post("/users/login", formData)
    .then((res) => res)
    .catch((error) => error);
};

//! ---------- AUTOLOGIN USER ---------- //

export const autoLoginUser = async (formData) => {
    return APIGym.post("/users/login/autoLogin", formData)
    .then((res) => res)
    .catch((error) => error);
};


//! ---------- RESEND CODE ---------- //

export const resendCodeConfirmationUser = async (formData) => {
    return APIGym.post("/users/resend", formData)
    .then((res) => res)
    .catch((error) => error);
};

//! ---------- CHECK CODE CONFIRMATION ---------- //

export const checkCodeConfirmationUser = async (formData) => {
    return APIGym.post("/users/check", formData)
      .then((res) => res)
      .catch((error) => error);
  };

//! ---------- FORGOT PASSWORD ---------- //

export const forgotPasswordUser = async (formData) => {
    return APIGym.patch("/users/forgotPassword", formData)
      .then((res) => res)
      .catch((error) => error);
  };

//! ---------- SEND PASSWORD ---------- //

export const sendPasswordUser = async (idUser, formData) => {
    return APIGym.patch(`/users/sendPassword/${idUser}`, formData)
      .then((res) => res)
      .catch((error) => error);
  };

//! ---------- CHANGE PASSWORD ---------- //

export const changePasswordUser = async (formData) => {
    return APIGym.patch("/users/changePassword", formData, {
      headers: {
        Authorization: `Bearer ${updateToken()}`,
      },
    })
      .then((res) => res)
      .catch((error) => error);
  };

//! ---------- UPDATE USER ---------- //

export const updateUser = async (formData) => {
    return APIGym.patch("/users/update/update", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${updateToken()}`,
      },
    })
      .then((res) => res)
      .catch((error) => error);
  };

//! ---------- GET ALL USER ---------- //

export const getAllUser = async () => {
    return APIGym.get("/users/")
      .then((res) => res)
      .catch((error) => error);
  };

//! ---------- GET BY ID USER ---------- //

export const getByIdUser = async (idUser) => {
    return APIGym.get(`/users/findById/${idUser}`)
      .then((res) => res)
      .catch((error) => error);
  };

//! ---------- GET BY NAME USER ---------- //

export const getByNameUser = async (name) => {
    return APIGym.get(`/users/findByName/${name}`)
      .then((res) => res)
      .catch((error) => error);
  };

//! ---------- GET BY GENDER USER ---------- //

export const getByGenderUser = async (gender, name) => {
    return APIGym.get(`/users/findByName/${gender}/${name}`)
      .then((res) => res)
      .catch((error) => error);
  };

//! ---------- CHANGE ROL USER ---------- //

export const changeRolUser = async (idUser, newRol, formData) => {
    return APIGym.patch(`/users/${idUser}/rol/${newRol}`, formData, {
      headers: {
        Authorization: `Bearer ${updateToken()}`,
      },
    })
      .then((res) => res)
      .catch((error) => error);
  };

