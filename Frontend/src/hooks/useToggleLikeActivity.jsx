import { useEffect } from 'react';
import Swal from 'sweetalert2';

export const useToggleLikeActivity = (res, setRes, login, user, setActivities) => {
  if (res?.status === 200) {
    console.log('hola', res.data.activityAll);
    setActivities(res.data.activityAll);
    const dataCustom = {
      token: user.token,
      user: res.data.user.name,
      email: res.data.user.email,
      image: res.data.user.image,
      check: res.data.user.check,
      _id: res.data.user._id,
      name: res.data.user.name,
      age: res.data.user.age,
      gender: res.data.user.gender,
      rol: res.data.user.rol,
      activitiesFav: res.data.user.activitiesFav,
    };
    const stringUser = JSON.stringify(dataCustom);
    login(stringUser);
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
