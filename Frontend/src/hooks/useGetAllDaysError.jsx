import Swal from 'sweetalert2';

export const useGetAllDaysError=(res,setRes,setDays)=>{
    if (res?.status == 200) {
    console.log("res",res)
    console.log('Datos dias lo sigue guardando en objeto', res.data);
    console.log('res.data.data(ahora es un array)', res.data.data);//revisar.
    setDays(res.data.data);
    setRes(() => ({}));
    }

    if (res?.response?.status == 404) {
    setRes(() => ({}));
    return Swal.fire({
      icon: 'info',
      title: 'No Days Found',
      text: 'No Days were found.',
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