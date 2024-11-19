import Swal from 'sweetalert2';

export const useDeleteReviewError = (resDeleteReview, setResDeleteReview, reload) => {
  if (resDeleteReview?.status === 200) {
    setResDeleteReview({});
    reload();

    Swal.fire('¡Borrado!', 'Tu review ha sido borrada.', 'success');
  }

  if (resDeleteReview?.response?.status > 300) {
    setResDeleteReview({});

    Swal.fire('Error', 'Hubo un problema al borrar la review.', 'error');
  }
};
