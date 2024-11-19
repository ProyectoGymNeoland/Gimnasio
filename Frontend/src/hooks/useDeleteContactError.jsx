import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const useDeleteContactError = (resDelete,setResDelete,setContacts) => {
    
  if (resDelete?.status == 200) {

    setContacts(resDelete.data.allContact)
    console.log("resDelete",resDelete.data.allContact)
    
    return Swal.fire({
      icon: 'info',
      title: 'Borrado:',
      text: 'Borrado de duda efectuado con exito',
      showConfirmButton: false,
      timer: 3000,
    });
    }

    if (resDelete?.response?.status == 404) {
    //setResDelete(() => ([]));
    return Swal.fire({
      icon: 'info',
      title: 'No Contacts Found',
      text: 'No Contacts were found.',
      showConfirmButton: false,
      timer: 3000,
    });
    }

    if (resDelete?.response?.status === 500) {
    //setResDelete(() => ([]));
    return Swal.fire({
      icon: 'error',
      title: 'Server Error',
      text: 'An internal server error occurred. Please try again later.',
      showConfirmButton: false,
      timer: 1500,
    });
    }
  
}
