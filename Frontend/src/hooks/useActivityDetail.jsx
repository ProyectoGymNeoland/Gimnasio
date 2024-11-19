import { useEffect } from 'react';
import Swal from 'sweetalert2';

export const useActivityDetail = (res, setRes, setActivity) => {
    if (res?.status == 200) {
      setActivity(res.data);
      setRes({});
    }

    if (res?.response?.status == 404) {
      Swal.fire({
        icon: 'error',
        title: 'Actividad  Not Found',
        text: 'The requested activity could not be found.',
        showConfirmButton: false,
        timer: 1500,
      });
      setRes({});
    }

    if (res?.response?.status == 500) {
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: 'An internal server error occurred. Please try again later.',
        showConfirmButton: false,
        timer: 1500,
      });
      setRes({});
    }
  }
