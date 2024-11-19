import { updateToken } from '../utils';
import { extraConfig } from './gym.config';

//! ---------- CREATE WALL ---------- //

export const createWall = async (formData) => {
  const APIGeneral = extraConfig();
  return APIGeneral.post('/wall/createWall', formData, {
    headers: { 'Content-Type': 'multipart/form-data', 
    Authorization: `Bearer ${updateToken()}`, },
  })
    .then((res) => res)
    .catch((error) => error);
    };


    //! ---------- GET BY USER ID ---------- //

export const getWallByUser = async (userId) => {
  const APIGeneral = extraConfig();
  return APIGeneral.get(`/wall/getByUser/${userId}`)
    .then((res) => res)
    .catch((error) => error);
};


//! ---------- GET BY ACTIVITY ---------- //

export const getWallByActivity = async (wallId) => {
  const APIGeneral = extraConfig();
  return APIGeneral.get(`/wall/findByActivitie/${wallId}/activities`)
    .then((res) => res)
    .catch((error) => error);
};

//! ---------- GET BY TYPE ---------- //

export const getWallByType = async (type) => {
  const APIGeneral = extraConfig();
  return APIGeneral.get(`/wall/findByType/${type}`)
    .then((res) => res)
    .catch((error) => error);
};


//! ---------- GET BY DAY ---------- //

export const getWallByDay = async (day) => {
  const APIGeneral = extraConfig();
  return APIGeneral.get(`/wall/findByDay/${day}`)
    .then((res) => res)
    .catch((error) => error);
};


//! ---------- DELETE WALL ---------- //

export const deleteWall = async (id) => {
  const APIGeneral = extraConfig();
  return APIGeneral.delete(`/wall/${id}`,{
    headers: {Authorization: `Bearer ${updateToken()}`},
})
    .then((res) => res)
    .catch((error) => error);
};

//! ---------- GET ALL WALLS ---------- //

export const getAllWalls = async () => {
  const APIGeneral = extraConfig();
  return APIGeneral.get('/wall/getall')
    .then((res) => res)
    .catch((error) => error);
};


//! ---------- DELETE WALL BY EXPIRATION ---------- //

export const deleteWallByExpiration = async () => {
  const APIGeneral = extraConfig();
  return APIGeneral.delete('/wall/paredesVencidas')
    .then((res) => res)
    .catch((error) => error);
};

//! ------------- GET BY ID  --------------- //

export const getWallById = async (wallId) => {
  const APIGeneral = extraConfig();
  return APIGeneral.get(`/wall/walls/${wallId}`)
    .then((res) => res)
    .catch((error) => error);
};

//! ------------- GET BY NAME  --------------- //

export const getWallByName = async (name) => {
  const APIGeneral = extraConfig();
  return APIGeneral.get(`/wall/${name}`)
    .then((res) => res)
    .catch((error) => error);
};
//! ------------- CREATE PUBLIC MESSAGE  --------------- //

export const createPublicMessage = async (wallId, messageData) => {
  const APIGeneral = extraConfig();
  return APIGeneral.post(`/wall/${wallId}/messages`, messageData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res.data)
    .catch((error) => {
      console.error('Error creating public message:', error);
      throw error;
    });
};