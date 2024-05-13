import { updateToken } from "../utils";
import { APIGym } from "./gym.config";

//! ---------- CREATE ACTIVITY ---------- //

export const createActivityService = async (formData) => {
  return APIGym.post("/activities/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
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
  return APIGym.get("/activities/getAll")
    .then((res) => console.log(res))
    .catch((error) => error);
};

//! ------------- GET BY ID  --------------- //

export const getById = async (idActivity) => {
  return APIGym.get(`/activities/${idActivity}`)
    .then((res) => console.log(res))
    .catch((error) => error);
};
