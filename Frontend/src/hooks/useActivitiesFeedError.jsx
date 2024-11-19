import { useEffect } from 'react';
import Swal from 'sweetalert2';

export const useActivitiesFeedError = (res, setRes, setData) => {
  console.log('HJJ', res);
  if (res?.status == 200) {
    console.log('esta todo correcto');
    setData(res.data);
    setRes(() => ({}));
  }

  if (res?.response?.status == 404) {
    setRes(() => ({}));
    return;//PENDIENTE REVISAR! EVE
    return Swal.fire({
      icon: 'info',
      title: 'No se encontraron actividades',
      text: 'Lo sentimos, no se encontraron actividades',
      showConfirmButton: false,
      timer: 3000,
    });
  }

  if (res?.response?.status == 409) {
    setRes(() => ({}));

    return Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Ocurrió un error al obtener las actividades.',
      showConfirmButton: false,
      timer: 3000,
    });
  }

  if (res?.status === 500) {
    setRes(() => ({}));

    return Swal.fire({
      icon: 'error',
      title: 'Server Error',
      text: 'Se ha producido un error interno del servidor. Por favor, inténtalo de nuevo más tarde.',
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
