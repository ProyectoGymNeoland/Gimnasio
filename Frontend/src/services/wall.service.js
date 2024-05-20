import { updateToken } from '../utils';
import { APIGym } from './gym.config';

//! ---------- CREATE WALL ---------- //

export const createWall = async (formData) => {
  return APIGym.post('/walls', formData, {
    headers: { 'Content-Type': 'application/json', 
    Authorization: `Bearer ${updateToken()}`, },
  })
    .then((res) => res)
    .catch((error) => error);
    };


    //! ---------- GET BY USER ID ---------- //

export const getWallByUser = async (userId) => {
  return APIGym.get(`/walls/user/${userId}`)
    .then((res) => res)
    .catch((error) => error);
};


//! ---------- GET BY ACTIVITY ---------- //

export const getWallByActivity = async (wallId) => {
  return APIGym.get(`/walls/activity/${wallId}`)
    .then((res) => res)
    .catch((error) => error);
};

//! ---------- GET BY TYPE ---------- //

export const getWallByType = async (type) => {
  return APIWall.get(`/walls/type/${type}`)
    .then((res) => res)
    .catch((error) => error);
};


//! ---------- GET BY DAY ---------- //

export const getWallByDay = async (day) => {
  return APIGym.get(`/walls/day/${day}`)
    .then((res) => res)
    .catch((error) => error);
};


//! ---------- DELETE WALL ---------- //

export const deleteWall = async (id) => {
  return APIGym.delete(`/walls/${id}`,{
    headers: {Authorization: `Bearer ${updateToken()}`},
})
    .then((res) => res)
    .catch((error) => error);
};

//! ---------- GET ALL WALLS ---------- //

export const getAllWalls = async () => {
  return APIGym.get('/walls')
    .then((res) => res)
    .catch((error) => error);
};


//! ---------- DELETE WALL BY EXPIRATION ---------- //

export const deleteWallByExpiration = async () => {
  return APIWall.delete('/walls/expired')
    .then((res) => res)
    .catch((error) => error);
};