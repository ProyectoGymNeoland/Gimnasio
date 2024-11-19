import Swal from 'sweetalert2';

export const useReviewsError = (
  res,
  setRes,
  setShowCreateReview,
  reloadReviews,
  setActivity,
) => {
  if (res?.status === 201) {
    Swal.fire({
      icon: 'success',
      title: 'Review creada',
      text: 'Tu review ha sido creada exitosamente. ¡Muchas gracias!',
      showConfirmButton: true,
    }).then(async () => {
      setShowCreateReview(false);
      setActivity(res.data.activityId);
    });
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
