import Swal from "sweetalert2/dist/sweetalert2.all.js";
export const useGetAllContactsError = (res,setRes,setContacts) => {

if (res?.status == 200) {
    console.log("que es res",res)
    setContacts(res.data);
    setRes(() => ({}));
    }

    if (res?.response?.status == 404) {
    setRes(() => ({}));
    return Swal.fire({
      icon: 'info',
      title: 'No Contacts Found',
      text: 'No Contacts were found.',
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
}
