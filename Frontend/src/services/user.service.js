import { updateToken } from '../utils';
import { extraConfig } from './gym.config';

//! ---------- REGISTER USER ---------- //

export const registerUser = async (formData) => {
  const APIGeneral = extraConfig();
    return APIGeneral.post("/users/registerLargo", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => res)
      .catch((error) => error);
  };

//! ---------- LOGIN USER ---------- //

export const loginUserService = async (formData) => {
    const APIGeneral = extraConfig();
    return APIGeneral.post("/users/login", formData)
    .then((res) => res)
    .catch((error) => error);
};

//! ---------- AUTOLOGIN USER ---------- //

export const autoLoginUser = async (formData) => {
    const APIGeneral = extraConfig();
    return APIGeneral.post("/users/login/autoLogin", formData)
    .then((res) => res)
    .catch((error) => error);
};


//! ---------- RESEND CODE ---------- //

export const resendCodeConfirmationUser = async (formData) => {
  const APIGeneral = extraConfig();
    return APIGeneral.post("/users/resend", formData)
    .then((res) => res)
    .catch((error) => error);
};

//! ---------- CHECK CODE CONFIRMATION ---------- //

export const checkCodeConfirmationUser = async (formData) => {
  const APIGeneral = extraConfig();
    return APIGeneral.post("/users/check", formData)
      .then((res) => res)
      .catch((error) => error);
  };

//! ---------- FORGOT PASSWORD ---------- //

export const forgotPasswordUser = async (formData) => {
  const APIGeneral = extraConfig();
    return APIGeneral.patch("/users/forgotPassword", formData)
      .then((res) => res)
      .catch((error) => error);
  };

//! ---------- SEND PASSWORD ---------- //

export const sendPasswordUser = async (idUser, formData) => {
  const APIGeneral = extraConfig();
    return APIGeneral.patch(`/users/sendPassword/${idUser}`, formData)
      .then((res) => res)
      .catch((error) => error);
  };

//! ---------- CHANGE PASSWORD ---------- //

export const changePasswordUser = async (formData) => {
  const APIGeneral = extraConfig();
    return APIGeneral.patch("/users/changePassword", formData, {
      headers: {
        Authorization: `Bearer ${updateToken()}`,
      },
    })
      .then((res) => res)
      .catch((error) => error);
  };

//! ---------- UPDATE USER ---------- //

export const updateUser = async (formData) => {
  const APIGeneral = extraConfig();
    return APIGeneral.patch("/users/update/update", formData, {
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
  const APIGeneral = extraConfig();
    return APIGeneral.get("/users/")
      .then((res) => res)
      .catch((error) => error);
  };

//! ---------- GET BY ID USER ---------- //

export const getByIdUser = async (idUser) => {
  const APIGeneral = extraConfig();
  return APIGeneral.get(`/users/findById/${idUser}`)
    .then((response) => {
      return response.data; // Devuelve solo los datos relevantes de la respuesta
    })
    .catch((error) => {
      console.error('Error al obtener el usuario por ID:', error);
      throw error; // Lanza el error para que pueda ser manejado en el código que llama a esta función
    });
};
//! ---------- GET BY NAME USER ---------- //

export const getByNameUser = async (name) => {
    const APIGeneral = extraConfig();
    return APIGeneral.get(`/users/findByName/${name}`)
      .then((res) => res)
      .catch((error) => error);
  };

//! ---------- GET BY GENDER USER ---------- //

export const getByGenderUser = async (gender, name) => {
    const APIGeneral = extraConfig();
    return APIGeneral.get(`/users/findByName/${gender}/${name}`)
      .then((res) => res)
      .catch((error) => error);
  };

//! ---------- GET BY ROL USER ---------- //

export const getByRolUser = async (rol) => {
    const APIGeneral = extraConfig();
    return APIGeneral.get(`/users/findByRol/${rol}`)
      .then((res) => res)
      .catch((error) => error);
  };

  
//! ---------- CHANGE ROL USER ---------- //

export const changeRolUser = async (idUser, newRol, formData) => {
    const APIGeneral = extraConfig();
    return APIGeneral.patch(`/users/${idUser}/rol/${newRol}`, formData, {
      headers: {
        Authorization: `Bearer ${updateToken()}`,
      },
    })
      .then((res) => res)
      .catch((error) => error);
  };


//! ---------- DELETE USER ---------- //

export const deleteUser = async (idUser) => {
  const APIGeneral = extraConfig();
  return APIGeneral.delete(`/users/${idUser}`, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};