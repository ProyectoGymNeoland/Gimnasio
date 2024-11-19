import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const useCreateContactError = (res,setRes,setOk,setTelephoneError,resetForm)=>{
    if (res?.status == 200){
        setOk(()=> true)
  
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Tu duda ha sido enviada con exito',
        showConfirmButton: false,
        timer: 1500,

            });
         setRes({});
         setTelephoneError("");
         resetForm();
    }
    if (res?.response?.status == 400) {
        setTelephoneError("El número de teléfono móvil no es válido.");
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