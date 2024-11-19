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
import Swal from 'sweetalert2'
export const useLoginError = (res, setRes, login, setLoginOk) => {

//! -----------------200

if (res?.status == 200) {
  const dataCustom = {
    token: res.data.token,
    user: res.data.user.name,
    email: res.data.user.email,
    image: res.data.user.image,
    check: res.data.user.check,
    _id: res.data.user._id,
    name: res.data.user.name,
    age: res.data.user.age,
    gender: res.data.user.gender,
    rol: res.data.user.rol,
  };

  const stringUser = JSON.stringify(dataCustom);
  login(stringUser);
  setLoginOk(() => true);

  Swal.fire({
    icon: "success",
    title: "Welcome to my Page",
    text: "Login ok ✅",
    showConfirmButton: false,
    timer: 1500,
  });
}

//! ----------------- 404: 'User no register'

if (res?.response?.data?.includes("User no register")) {
  setRes(() => ({}));
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Unregistered user ❎",
    showConfirmButton: false,
    timer: 1500,
  });
}

//!------------------ 404: 'password dont match'

if (res?.response?.data?.includes("password dont match")) {
  setRes(() => ({}));
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Password dont match ❎",
    showConfirmButton: false,
    timer: 1500,
  });
}

//! ----------------- 500
if (res?.response?.status == 500) {
  setRes(() => ({}));
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Interval Server Error ❎!",
    showConfirmButton: false,
    timer: 1500,
  });
}
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
  export const checkUsername = async (username) => {
    const APIGeneral = extraConfig();
    return APIGeneral.post('/users/checkUsername', { name: username })
    .then((res) => res.data)
    .catch((error) => {
      if (error.response && error.response.status === 409) {
        Swal.fire({
          title: 'Exte usuario ya existe',
          text: 'Por favor, elige un nombre diferente.',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500,
        });
      }
      throw error.response;
    });
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