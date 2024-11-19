import { useEffect } from 'react';
import Swal from 'sweetalert2';

export const useGetChatError = (res, setRes, setUserNotFound) => {
  useEffect(() => {
    if (res) {
      // 404 -> "User not found"
      if (res?.res?.status === 404 && res?.res?.data.includes('User not found')) {
        setUserNotFound(true);
        setRes({});
        Swal.fire({
          icon: 'error',
          title: 'User not found ❎',
          text: 'The user you are trying to interact with does not exist. Please check and try again.',
          showConfirmButton: false,
          timer: 1500,
        });
      }

      // 404 -> "No se encontraron chats para el usuario."
      if (res?.res?.status === 404 && res?.res?.data.includes('No se encontraron chats para el usuario.')) {
        setRes({});
        Swal.fire({
          icon: 'info',
          title: 'No Chats Found ❎',
          text: 'No chats were found for the specified user.',
          showConfirmButton: false,
          timer: 1500,
        });
      }

      // 500 -> "Internal server error"
      if (res?.res?.status === 500) {
        setRes({});
        Swal.fire({
          icon: 'error',
          title: 'Internal Server Error ❎',
          text: 'An internal server error occurred. Please try again later.',
          showConfirmButton: false,
          timer: 1500,
        });
      }

      // Other errors
      if (res?.res && ![404, 500].includes(res?.res?.status)) {
        setRes({});
        Swal.fire({
          icon: 'error',
          title: 'Error ❎',
          text: `An error occurred: ${res.res.data}. Please try again.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  }, [res, setRes, setUserNotFound]);
};

