import { extraConfig } from "./gym.config";
import { updateToken } from "../utils";

//! ---------- CREATE DAY ---------- //

export const createDay = async (dayData) => {
  const APIGeneral = extraConfig();
  return APIGeneral.post('/day/createDay', dayData, {
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
  const APIGeneral = extraConfig();
  return APIGeneral.put(`/day/update/${idDay}`, dayData, {
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
  const APIGeneral = extraConfig();
  return APIGeneral.delete(`/day/${idDay}`, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! ---------- GET ALL DAY ---------- //
export const getAllDays= async ()=>{
  const APIGeneral = extraConfig();
    return APIGeneral.get("/day//getAll")
    .then((res) => res)
    .catch((error) => error);
}

//! ---------- GET BY ID DAY ---------- //
export const getDayId= async (id)=>{
  const APIGeneral = extraConfig();
    return APIGeneral.get(`/day/getById/${id}`)
    .then((res) => res)
    .catch((error) => error);
}