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


//! ---------- FIND MESSAGE BY ID ---------- //
export const findMessageById = async (messageId) => {
  try {
      const response = await APIGym.get(`/message/${messageId}`);
      return response.data;
  } catch (error) {
      console.error('Error al encontrar el mensaje por ID:', error);
      throw error;
  }
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


