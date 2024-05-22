import { APIGym } from "./gym.config";
import { updateToken } from "../utils";

//! ---------- CREATE DAY ---------- //

export const createDay = async (dayData) => {
  return APIGym.post('/days', dayData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! ---------- UPDATE DAY ---------- //

export const updateDay = async (idDay, dayData) => {
  return APIGym.put(`/days/${idDay}`, dayData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! ---------- DELETE DAY ---------- //

export const deleteDay = async (idDay) => {
  return APIGym.delete(`/days/${idDay}`, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! ---------- FIND DAY BY ID ---------- //

export const findDayById = async (idDay) => {
  return APIGym.get(`/days/findById/${idDay}`, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};
