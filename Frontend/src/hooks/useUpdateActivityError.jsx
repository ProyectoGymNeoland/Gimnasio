import Swal from 'sweetalert2';

export const useUpdateActivityError = (res, setRes, setActivity) => {
  if (res?.status == 200) {
    setActivity(res.data.activity)
    setRes(() => ({}));
    return Swal.fire({
      icon: 'success',
      title: `Update activity✅`,
      text: ` Updated `,
      showConfirmButton: false,
      timer: 1500,
    });
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