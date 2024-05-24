import { Link } from 'react-router-dom';
import './FigureActivity.css';
import { toggleLikeActivity } from '../services/activities.service';
import { useAuth } from '../context/authContext';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { useToggleLikeActivity } from '../hooks/useToggleLikeActivity';
import { ToggleFavorite } from './ToggleFavorite';

const Figure = ({ activity, user, setActivities }) => {
  const { login } = useAuth();

  const [res, setRes] = useState({});
  const [like, setLike] = useState(false);

  const handleLike = async () => {
    setRes(await toggleLikeActivity(activity._id));
  };
  const handleLikeAnonymous = () => {
    Swal.fire({
      icon: 'info',
      title: 'Para guardar tus favoritos regístrate',
      html: `<a href="/login">Haz click aquí!</a>`,

      showConfirmButton: false,
      timer: 3000,
    });
  };

  useEffect(() => {
    useToggleLikeActivity(res, setRes, login, user, setActivities);
  }, [res]);

  useEffect(() => {}, [like]);

  return (
    <figure>
      <Link to={`/activities/${activity._id}`}>
        {activity.image && <img src={activity.image} alt={activity.name} width="200" />}
        <figcaption>
          <h2>{activity.name}</h2>
          <p>{activity.type}</p>
        </figcaption>
      </Link>
      {user && ( // Muestra el botón solo si el usuario está autenticado
        <ToggleFavorite
          handleLike={handleLike}
          isFav={activity.like.includes(user._id) ? true : false}
        />
      )}
      {!user && (
        <button onClick={handleLikeAnonymous}>
          <span className="material-symbols-outlined">favorite</span>
        </button>
      )}
    </figure>
  );
};

export default Figure;
