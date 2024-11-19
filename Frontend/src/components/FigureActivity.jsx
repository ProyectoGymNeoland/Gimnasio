import { Link } from 'react-router-dom';
import './FigureActivity.css';
import { toggleLikeActivity } from '../services/activities.service';
import { useAuth } from '../context/authContext';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { useToggleLikeActivity } from '../hooks/useToggleLikeActivity';
import { ToggleFavorite } from './ToggleFavorite';
import { RatingStars } from './RatingStars';
import { getReviewsByActivityId } from '../services/review.service';
import { useRatingError } from '../hooks/useRatingError';

const Figure = ({ activity, user, setActivities }) => {
  const { login } = useAuth();

  const [res, setRes] = useState({});
  const [like, setLike] = useState(false);
  const [rating, setRating] = useState(0);
  const [resRating, setResRating] = useState({});

  useEffect(() => {
    (async () => {
      setResRating(await getReviewsByActivityId(activity._id));
    })();
  }, []);

  useEffect(() => {
    useToggleLikeActivity(res, setRes, login, user, setActivities);
  }, [res]);

  useEffect(() => {
    useRatingError(resRating, setRating, setResRating); //usamos un custom hook que maneja la respuesta, y actualiza las activitys
  }, [resRating]); // cada vez que la res cambia, se ejecuta este useEffect.

  useEffect(() => {}, [like]);
  useEffect(() => {}, [rating]);

  const handleLike = async () => {
    setRes(await toggleLikeActivity(activity._id));
  };

  const handleLikeAnonymous = () => {
    Swal.fire({
      icon: 'info',
      title: 'Para guardar tus favoritos regístrate',
      html: `<a href="/login">Haz click aquí!</a>`,
      showConfirmButton: true,
    });
  };

  return (
    <figure>
      <Link to={`/activities/${activity._id}`}>
        {activity.image && <img src={activity.image} alt={activity.name} width="200" />}
        <figcaption>
          <h2>{activity.name}</h2>
          <RatingStars
            rating={rating.avg}
            count={rating.data?.length || 0}
            showCount={true}
            showLinkReviews={false}
            showReviews={''}
          />
          <p>{activity.type}</p>
        </figcaption>
      </Link>
      {user && ( // Muestra el botón solo si el usuario está autenticado
        <ToggleFavorite
          handleLike={handleLike}
          isFav={activity.like.includes(user._id) ? true : false}
        />
      )}
      {!user && <ToggleFavorite handleLike={handleLikeAnonymous} isFav={false} />}
    </figure>
  );
};

export default Figure;
