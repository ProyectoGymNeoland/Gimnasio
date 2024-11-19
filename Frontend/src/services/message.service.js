import { extraConfig } from "./gym.config";
import { updateToken } from "../utils";


//! ---------- CREATE MESSAGE ---------- //

export const createMessage = async (idRecipient, content) => {
  const APIGeneral = extraConfig();
  return APIGeneral.post(`/message/${idRecipient}`,
      { type: 'private',  content },
      {
          headers: {
              'Authorization': `Bearer ${updateToken()}`,
              'Content-Type': 'application/json'
          }
      }
  ).then((res) => res)
  .catch((error) => error)
};

  //! ---------- DELETE MESSAGE ---------- //

export const deleteMessageByUser = async (idUser) => {
  const APIGeneral = extraConfig();
  return APIGeneral.delete(`/message/${idUser}`)
    .then((res) => res)
    .catch((error) => error);
};


//! ---------- FIND MESSAGE BY ID ---------- //
export const findMessageById = async (messageId) => {
  const APIGeneral = extraConfig();
  return APIGeneral.get(`/message/${messageId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Error al encontrar el mensaje por ID:', error);
      throw error;
    });
};


//! ---------- LIKE MESSAGE WALL---------- //

export const likeMessageWall = async (idUser, formData) => {
  const APIGeneral = extraConfig();
  return APIGeneral.get(`/message/like/${idUser}`, formData, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    }
  })
    .then((res) => res)
    .catch((error) => error);
};


