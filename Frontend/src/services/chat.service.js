import { updateToken } from '../utils';
import { APIGym } from './gym.config';

//! ---------- GET CHAT BY USER ID ---------- //

export const getChatsByUserId = async (userId) => {
  try {
    const response = await APIGym.get(`/chat/${userId}`, {
      headers: {
        Authorization: `Bearer ${updateToken()}`,
      },
    });
    console.log('Chats recibidos:', response.data); // Agrega este console.log para verificar los datos recibidos
    return response.data; // Asegúrate de devolver response.data
  } catch (error) {
    console.error('Error al obtener chats:', error);
    throw error; // Propaga el error para manejarlo en el componente que llama a esta función
  }
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
      //! ---------- GET CHAT BY ID (CHAT)  ---------- //


    export const getChatById = async (chatId) => {
      try {
        const response = await APIGym.get(`/chat/detail/${chatId}`, {
          headers: {
            Authorization: `Bearer ${updateToken()}`,
          },
        });
        console.log('Detalles del chat:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error al obtener los detalles del chat:', error);
        throw error;
      }
    };