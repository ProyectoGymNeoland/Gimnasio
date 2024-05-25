import { APIGym } from "./gym.config";
import { updateToken } from "../utils";

//! ---------- CREATE DAY ---------- //

export const createDay = async (dayData) => {
  return APIGym.post('/day/createDay', dayData, {
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
  return APIGym.put(`/day/update/${idDay}`, dayData, {
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
  return APIGym.delete(`/day/${idDay}`, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

