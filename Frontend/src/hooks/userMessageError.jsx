import { useEffect } from 'react';
import Swal from 'sweetalert2';

export const userMessageError = (res, setRes, setUserNotFound) => {
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

      // 404 -> "Error in updating chat"
      if (res?.res?.status === 404 && res?.res?.data.includes('error en actualizar el chat existente')) {
        setRes({});
        Swal.fire({
          icon: 'error',
          title: 'Update Error ❎',
          text: 'Error in updating the existing chat. The message has been deleted.',
          showConfirmButton: false,
          timer: 1500,
        });
      }

      // 404 -> "Chat creation error"
      if (res?.res?.status === 404 && res?.res?.data.includes('no se ha creado el chat pero no se ha borrado el comentario')) {
        setRes({});
        Swal.fire({
          icon: 'error',
          title: 'Chat Creation Error ❎',
          text: 'The chat could not be created and the message could not be deleted. Please try again.',
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

      // Successful res with a message
      if (res?.status === 200 && res?.data?.comment) {
        Swal.fire({
          icon: 'success',
          title: 'Message Sent ✅',
          text: 'Your message has been successfully sent!',
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
