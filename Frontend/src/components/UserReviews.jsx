import './UserReviews.css';
import React, { useEffect, useState } from 'react';
import { deleteReview, getReviewsByUser } from '../services/review.service';
import { useAuth } from '../context/authContext';
import { RatingStars } from './RatingStars';
import { useUserReviewsError } from '../hooks/useUserReviewsError';
import Swal from 'sweetalert2';
import { useDeleteReviewError } from '../hooks/useDeleteReviewError';

export const UserReviews = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [res, setRes] = useState({});
  const [resDeleteReview, setResDeleteReview] = useState({});

  useEffect(() => {
    (async () => {
      setRes(await getReviewsByUser(user._id));
    })();
  }, []);

  useEffect(() => {
    useUserReviewsError(res, setRes, setReviews); //usamos un custom hook que maneja la respuesta, y actualiza el user
  }, [res]); // cada vez que la res cambia, se ejecuta este useEffect.

  useEffect(() => {}, [reviews]);

  useEffect(() => {
    useDeleteReviewError(resDeleteReview, setResDeleteReview, reload);
  }, [resDeleteReview]);

  const reload = () => {
    (async () => {
      setRes(await getReviewsByUser(user._id));
    })();
  };

  const handleDelete = (reviewId) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        (async () => {
          setResDeleteReview(await deleteReview(reviewId));
        })();
      }
    });
  };

  return (
    <div className="user-reviews">
      <h2>Mis Reviews</h2>
      {reviews.length === 0 && (
        <p>
          Aún no has hecho ninguna review. <br></br>Ve a la{' '}
          <a href="/activities/feed">página de actividades</a> y elige la que quieras
          valorar. ¡Tu opinión cuenta!
        </p>
      )}

      {reviews.length > 0 &&
        reviews.map((review, index) => (
          <div key={index} className="review-item">
            <h3>{review?.activities?.name}</h3>
            <RatingStars
              rating={review.rating}
              count={0}
              showCount={false}
              showLinkReviews={false}
              showReviews={false}
            />
            <p>{review.content}</p>
            <div className="delete-review">
              <a onClick={() => handleDelete(review._id)}>
                <span className="material-symbols-outlined">delete</span>
              </a>
            </div>
          </div>
        ))}
    </div>
  );
};
