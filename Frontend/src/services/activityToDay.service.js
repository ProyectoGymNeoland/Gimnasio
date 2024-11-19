import { updateToken } from "../utils";
import { extraConfig } from "./gym.config"


//!------------------------ CREATE ----------------------------!

export const createActivityToDayService = async (formData)=>{
    const APIGeneral = extraConfig();
    return APIGeneral.post("/activityToDay/createActivityToDay", formData,{
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
}

//!------------------------ GETALL ----------------------------!

export const getAllActivityToDay= async ()=>{
    const APIGeneral = extraConfig();
    return APIGeneral.get("/activityToDay/")
    .then((res) => res)
    .catch((error) => error);
}
//!------------------------ FIND.ID ----------------------------!

export const getActivityToDayActivityToDay= async (id)=>{
    const APIGeneral = extraConfig();
    return APIGeneral.get(`/activityToDay/findById/${id}`)
    .then((res) => res)
    .catch((error) => error);
}
//!------------------------ BOOKING ----------------------------!

export const bookingActivityToDay= async (id)=>{
    const APIGeneral = extraConfig();
    return APIGeneral.patch(`/activityToDay/booking/${id}`,{
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
}
//!------------------------ UPDATE ----------------------------!

export const updateActivityToDay= async (formData,id)=>{
    const APIGeneral = extraConfig();
    return APIGeneral.patch(`/activityToDay/${id}`,formData, {
        headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
}
//!------------------------ DELETE ----------------------------!

export const deleteActivityToDay= async (id)=>{
    const APIGeneral = extraConfig();
    return APIGeneral.delete(`/activityToDay/${id}`,{
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
}

//!------------------------ GETBOOKINGSBYUSERID ----------------------------!

export const getAllBookings = async (id)=>{
  const APIGeneral = extraConfig();
  return APIGeneral.get(`/activityToDay/bookedActivities/${id}`)
  .then((res) => res)
  .catch((error) => error);

}

//!------------------------CREATEDAYACTIVITY---------------------------------!

export const createUltimateDay = async(formData)=>{
  const APIGeneral = extraConfig();
  return APIGeneral.post("/activityToDay/createDayActivity", formData,{
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
}