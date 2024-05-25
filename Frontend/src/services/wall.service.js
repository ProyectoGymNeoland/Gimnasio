import { updateToken } from '../utils';
import { APIGym } from './gym.config';

//! ---------- CREATE WALL ---------- //

export const createWall = async (formData) => {
  return APIGym.post('/wall/createWall', formData, {
    headers: { 'Content-Type': 'multipart/form-data', 
    Authorization: `Bearer ${updateToken()}`, },
  })
    .then((res) => res)
    .catch((error) => error);
    };


    //! ---------- GET BY USER ID ---------- //

export const getWallByUser = async (userId) => {
  return APIGym.get(`/wall/getByUser/${userId}`)
    .then((res) => res)
    .catch((error) => error);
};


//! ---------- GET BY ACTIVITY ---------- //

export const getWallByActivity = async (wallId) => {
  return APIGym.get(`/wall/findByActivitie/${wallId}/activities`)
    .then((res) => res)
    .catch((error) => error);
};

//! ---------- GET BY TYPE ---------- //

export const getWallByType = async (type) => {
  return APIWall.get(`/wall/findByType/${type}`)
    .then((res) => res)
    .catch((error) => error);
};


//! ---------- GET BY DAY ---------- //

export const getWallByDay = async (day) => {
  return APIGym.get(`/wall/findByDay/${day}`)
    .then((res) => res)
    .catch((error) => error);
};


//! ---------- DELETE WALL ---------- //

export const deleteWall = async (id) => {
  return APIGym.delete(`/wall/${id}`,{
    headers: {Authorization: `Bearer ${updateToken()}`},
})
    .then((res) => res)
    .catch((error) => error);
};

//! ---------- GET ALL WALLS ---------- //

export const getAllWalls = async () => {
  return APIGym.get('/wall/getall')
    .then((res) => res)
    .catch((error) => error);
};


//! ---------- DELETE WALL BY EXPIRATION ---------- //

export const deleteWallByExpiration = async () => {
  return APIWall.delete('/wall/paredesVencidas')
    .then((res) => res)
    .catch((error) => error);
};