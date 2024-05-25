import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const useCreateActivityDayError=(res,setRes,setOk)=>{
    if(res?.status == 200){
        setOk(()=> true)
  
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Clase creada con exito',
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
    if (res?.response?.status == 400) {
        Swal.fire({
            icon: 'error',
            title: 'El usuario no es un monitor',
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
};