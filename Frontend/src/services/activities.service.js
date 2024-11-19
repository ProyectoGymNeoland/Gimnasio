import { updateToken } from '../utils';
import { extraConfig } from './gym.config';

//! ---------- CREATE ACTIVITY ---------- //

export const createActivityService = async (formData) => {
  const APIGeneral = extraConfig();
  return APIGeneral.post('/activities/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! ---------- TOGGLE CAMBIAR STATUS ACTIVITY ---------- //

export const toggleStatus = async (idActivity) => {
  const APIGeneral = extraConfig();
  return APIGeneral.patch(`/activities/toggleStatus/${idActivity}`, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! ------------- GET ALL  --------------- //

export const getAllActivities = async () => {
  const APIGeneral = extraConfig();
  return APIGeneral.get('/activities/getAll')
    .then((res) => res)
    .catch((error) => error);
};

//! ------------- GET BY ID  --------------- //

export const getById = async (idActivity) => {
  const APIGeneral = extraConfig();
  return APIGeneral.get(`/activities/${idActivity}`)
    .then((res) => res)
    .catch((error) => error);
};

//! ------------- GET BY NAME  --------------- //

export const getByName = async (name) => {
  const APIGeneral = extraConfig();
  return APIGeneral.get(`/activities/name/${name}`)
    .then((res) => res)
    .catch((error) => error);
};

//! ------------- GET BY TYPE  --------------- //

export const getByType = async (type) => {
  const APIGeneral = extraConfig();
  return APIGeneral.get(`/activities/type/${type}`)
    .then((res) => res)
    .catch((error) => error);
};
//? Quitamos el middelware isAuth de la ruta??

//! ---------- UPDATE ACTIVITY ----------- //

export const updateActivity = async (idActivity, formData) => {
  const APIGeneral = extraConfig();
  return APIGeneral.put(`/activities/${idActivity}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! ---------- TOGGLE LIKE ACTIVITY ----------- //

export const toggleLikeActivity = async (idActivity) => {
  const APIGeneral = extraConfig();
  return APIGeneral.patch(`/activities/like/${idActivity}`, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! -------- DELETE ACTIVITY ----- //

export const deleteActivity = async (idActivity) => {
  const APIGeneral = extraConfig();
  return APIGeneral.delete(`/activities/${idActivity}`, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};
