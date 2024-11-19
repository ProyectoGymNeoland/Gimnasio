import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const useErrorBooking = (res,setRes) => {



    if(res?.data?.action.includes("Reserva realizada")){
        Swal.fire({
        icon: 'success',
        title: 'Reserva:',
        text: 'Reserva realizada con exito',
        showConfirmButton: false,
        timer: 2000,

        });
        setRes({});
    }

    if(res?.data?.action.includes("Quitar reserva")){
        Swal.fire({
        icon: 'success',
        title: 'Reserva:',
        text: 'Tu reserva ha sido cancelada',
        showConfirmButton: false,
        timer: 2000,

        });
        setRes({});
    }

    if (res?.response?.status == 404) {
        Swal.fire({
            icon: 'error',
            title: 'No se ha podido realizar la reserva',
            showConfirmButton: false,
            timer: 1500,
        });
        setRes({});
    }
   
    if (res?.response?.status == 500) {
        Swal.fire({
            icon: 'error',
            title: 'internal server error 500, inténtalo de nuevo',
            showConfirmButton: false,
            timer: 1500,
        });
        setRes({});
    }
  
}
