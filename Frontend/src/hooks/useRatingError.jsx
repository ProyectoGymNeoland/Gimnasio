import Swal from 'sweetalert2';

export const useRatingError = (res, setRating, setRes) => {
  if (res?.status === 200) {
    setRating(res.data);
    setRes({});
  }

  if (res?.response?.status > 300) {
    Swal.fire({
      icon: 'error',
      title: res.error,
      text: res.message,
      showConfirmButton: false,
      timer: 1500,
    });
    setRes({});
  }
};
