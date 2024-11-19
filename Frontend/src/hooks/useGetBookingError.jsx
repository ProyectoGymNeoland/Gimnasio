import Swal from 'sweetalert2';

export const useGetBookingError=(res, setRes, setBookings)=>{
    if (res?.status == 200) {
      setBookings(res.data);
      setRes({});
    }

    if (res?.response?.status == 404) {
      Swal.fire({
        icon: 'error',
        title: 'No tienes ninguna reserva',
        text: 'Todavio no has realizado ninguna reserva',
        showConfirmButton: false,
        timer: 1500,
      });
      setRes({});
    }

    if (res?.response?.status == 500) {
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: 'An internal server error occurred. Please try again later.',
        showConfirmButton: false,
        timer: 1500,
      });
      setRes({});
    }
}