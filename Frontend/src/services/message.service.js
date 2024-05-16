import { APIGym } from "./gym.config";
import { updateToken } from "../utils";


//! ---------- CREATE MESSAGE ---------- //

export const createMessage = async (idRecipient, formData) => {
    return APIGym.post(`/message/${idRecipient}` , formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${updateToken()}`,
      }
    })
      .then((res) => res)
      .catch((error) => error);
  };
  

  //! ---------- DELETE MESSAGE ---------- //

export const deleteMessageByUser = async (idUser) => {
  return APIGym.delete(`/message/${idUser}`)
    .then((res) => res)
    .catch((error) => error);
};


 //! ---------- FIND MESSAGE ---------- //

 export const findMessageById = async (idUser) => {
  return APIGym.get(`/message/findById/${idUser}`)
    .then((res) => res)
    .catch((error) => error);
};

//! ---------- LIKE MESSAGE WALL---------- //

export const likeMessageWall = async (idUser, formData) => {
  return APIGym.get(`/message/like/${idUser}`, formData, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    }
  })
    .then((res) => res)
    .catch((error) => error);
};

