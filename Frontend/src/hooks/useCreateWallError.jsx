import Swal from "sweetalert2/dist/sweetalert2.all.js";


export const useCreateWallError = (res, setRes, setOk) => {

    // status 201 : todo ok
    if (res?.status === 201) {
      Swal.fire({
        title: 'Muro creado exitosamente!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      });
      setOk(true);
      setRes(null);
    }

    // status 400 : Bad Request
    if (res?.response?.status === 400) {
      Swal.fire({
        title: 'Debes tener rol de monitor para crear un muro',
        text: res.response.data.error || 'Debes tener rol de monitor para crear un muro',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500,
      });
      setRes(null);
    }

    // status 500 : Internal Server Error
    if (res?.response?.status === 500) {
      Swal.fire({
        title: 'Error interno del servidor',
        text: 'Inténtalo de nuevo más tarde',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500,
      });
      setRes(null);
    }
  }