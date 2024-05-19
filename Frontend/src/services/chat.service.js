import { updateToken } from '../utils';
import { APIGym } from './gym.config';

//! ---------- GET CHAT BY USER ID ---------- //

export const getChatsByUserId = async (idUser) => {
    return APIGym.get(`/chat/${idUser}`, {
      headers: {
        Authorization: `Bearer ${updateToken()}`,
      },
    })
      .then((res) => res)
      .catch((error) => error);
  };

  //! ---------- DELETE CHAT  ---------- //


export const deleteChat = async (chatId) => {
  return APIGym.delete(`/chat/${chatId}`, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
    };