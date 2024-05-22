import { updateToken } from "../utils";
import { APIGym } from "./gym.config"

export const createContacts = async(formData)=>{
    return APIGym.post("/contact/createContact",formData)
    .then((res) => res)
    .catch((error) => error)
};

export const deleteContacts = async(id)=>{
    return APIGym.delete(`/contact/delete/${id}`,{
      headers: {
        Authorization: `Bearer ${updateToken()}`,
      },
    }).then((res) => res)
      .catch((error) => error);
}

export const getAllContacts = async()=>{
    return APIGym.get("/contact/getContacts")
        .then((res) => res)
        .catch((error) => error);
}