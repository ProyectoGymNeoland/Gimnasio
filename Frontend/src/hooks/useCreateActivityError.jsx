import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const useCreateActivityError = (res, setRes, setOK) => {
      if (res?.status == 201) {
        setOK(()=> true)
  
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Actividad creada con éxito',
        showConfirmButton: false,
        timer: 1500,

            });
         setRes({});
      }


    if (res?.response?.status == 400 ) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Type',
        text: 'Tipo de actividad no válida. Acepta "pistas" o "colectivas".',
        showConfirmButton: false,
        timer: 1500,

      });
      setRes({});
    }

    if (res?.response?.status == 409) {
        Swal.fire({
            icon: 'error',
            title: 'Esta actividad ya existe',
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