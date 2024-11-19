import { useEffect } from 'react';
import Swal from 'sweetalert2';

export const useWallsFeedError = (res, setRes, setData) => {
  console.log('HJJ', res);
  if (res?.status == 200) {
    console.log(res.data.walls)
    setData(res.data.walls);
    setRes(() => ({}));
  }

  if (res?.response?.status == 404) {
    setRes(() => ({}));
    return;//PENDIENTE REVISAR! EVE
    return Swal.fire({
      icon: 'info',
      title: 'No Activities Found',
      text: 'No activities were found.',
      showConfirmButton: false,
      timer: 3000,
    });
  }

  if (res?.status === 500) {
    setRes(() => ({}));

    return Swal.fire({
      icon: 'error',
      title: 'Server Error',
      text: 'An internal server error occurred. Please try again later.',
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
