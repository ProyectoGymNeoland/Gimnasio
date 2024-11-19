import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const useCreateNewDayError=(res,setRes,setOk,setDate)=>{

    if(res?.status == 200){
        setOk(()=> true)
  
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Dia creado con exito',
        showConfirmButton: false,
        timer: 1500,

            });
         setRes({});
    }

    if (res?.response?.status == 404) {
        Swal.fire({
            icon: 'error',
            title: 'Dia no creado',
            showConfirmButton: false,
            timer: 1500,
        });
        setRes({});
    }

    if (res?.response?.status == 400) {
        setDate(true);
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