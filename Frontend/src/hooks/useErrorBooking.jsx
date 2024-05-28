import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const useErrorBooking = (res,setRes) => {

    if(res?.status == 200){
        
  
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'reservado',
        showConfirmButton: false,
        timer: 1500,

            });
         setRes({});
    }
    if (res?.response?.status == 404) {
        Swal.fire({
            icon: 'error',
            title: 'Actividad no encontrada',
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
