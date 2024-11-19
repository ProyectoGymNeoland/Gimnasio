import Swal from 'sweetalert2';

export const useGetDayError = (res, setRes, setDay) => {
    if (res?.status == 200) {
      setDay(res.data);
      setRes({});
    }

    if (res?.response?.status == 404) {
      Swal.fire({
        icon: 'error',
        title: 'Day Not Found',
        text: 'The requested day could not be found.',
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
