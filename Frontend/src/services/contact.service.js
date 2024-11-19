import { updateToken } from "../utils";
import { extraConfig } from "./gym.config"

export const createContacts = async(formData)=>{
  const APIGeneral = extraConfig();
    return APIGeneral.post("/contact/createContact",formData)
    .then((res) => res)
    .catch((error) => error)
};

export const deleteContacts = async(id)=>{
  const APIGeneral = extraConfig();
    return APIGeneral.delete(`/contact/delete/${id}`,{
      headers: {
        Authorization: `Bearer ${updateToken()}`,
      },
    }).then((res) => res)
      .catch((error) => error);
}

export const getAllContacts = async()=>{
  const APIGeneral = extraConfig();
    return APIGeneral.get("/contact/getContacts")
        .then((res) => res)
        .catch((error) => error);
}