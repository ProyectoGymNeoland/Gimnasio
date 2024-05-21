import { updateToken } from '../utils';
import { APIGym } from './gym.config';

//! ---------- CREATE ACTIVITY ---------- //

export const createActivityService = async (formData) => {
  return APIGym.post('/activities/create', formData, {
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
  return APIGym.patch(`/activities/toggleStatus/${idActivity}`, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! ------------- GET ALL  --------------- //

export const getAllActivities = async () => {
  return APIGym.get('/activities/getAll')
    .then((res) => res)
    .catch((error) => error);
};

//! ------------- GET BY ID  --------------- //

export const getById = async (idActivity) => {
  return APIGym.get(`/activities/${idActivity}`)
    .then((res) => res)
    .catch((error) => error);
};

//! ------------- GET BY NAME  --------------- //

export const getByName = async (name) => {
  return APIGym.get(`/activities/name/${name}`)
    .then((res) => res)
    .catch((error) => error);
};

//! ------------- GET BY TYPE  --------------- //

export const getByType = async (type) => {
  return APIGym.get(`/activities/type/${type}`)
    .then((res) => res)
    .catch((error) => error);
};
//? Quitamos el middelware isAuth de la ruta??

//! ---------- UPDATE ACTIVITY ----------- //

export const updateActivity = async (idActivity, formData) => {
  return APIGym.put(`/activities/${idActivity}`, formData, {
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
  return APIGym.patch(`/activities/like/${idActivity}`, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! -------- DELETE ACTIVITY ----- //

export const deleteActivity = async (idActivity) => {
  return APIGym.delete(`/activities/${idActivity}`, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};
