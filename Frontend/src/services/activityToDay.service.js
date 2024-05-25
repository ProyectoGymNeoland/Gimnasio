import { updateToken } from "../utils";
import { APIGym } from "./gym.config"


//!------------------------ CREATE ----------------------------!

export const createActivityToDayService = async (formData)=>{
    return APIGym.post("/activityToDay/createActivityToDay", formData,{
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
}

//!------------------------ GETALL ----------------------------!

export const getAllActivityToDay= async ()=>{
    return APIGym.get("/activityToDay/")
    .then((res) => res)
    .catch((error) => error);
}
//!------------------------ FIND.ID ----------------------------!

export const getActivityToDayActivityToDay= async (id)=>{
    return APIGym.get(`/activityToDay/findById/${id}`)
    .then((res) => res)
    .catch((error) => error);
}
//!------------------------ BOOKING ----------------------------!

export const bookingActivityToDay= async (formData,id)=>{
    return APIGym.patch(`/activityToDay/booking/${id}`,formData,{
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
}
//!------------------------ UPDATE ----------------------------!

export const updateActivityToDay= async (formData,id)=>{
    return APIGym.patch(`/activityToDay/${id}`,formData, {
        headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
}
//!------------------------ DELETE ----------------------------!

export const deleteActivityToDay= async (id)=>{
    return APIGym.delete(`/activityToDay/${id}`,{
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
}