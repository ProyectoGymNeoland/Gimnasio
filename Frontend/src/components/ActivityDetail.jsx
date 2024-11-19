import './ActivityDetail.css';
import React, { useEffect, useState } from 'react';
import { getById } from '../services/activities.service';
import { useAuth } from '../context/authContext';
import { CreateReview } from './CreateReview';
import { RatingStars } from './RatingStars';
import { getReviewsByActivityId } from '../services/review.service';
import { useRatingError } from '../hooks/useRatingError';
import { Reviews } from './Reviews';

const ActivityDetail = ({ activity, setActivity }) => {
  const { user } = useAuth();
  const [showCreateReview, setShowCreateReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [resRating, setResRating] = useState({});
  const [showReviews, setShowReviews] = useState(false);
  //const rating = 4;
  //Estados para pintar las ratingStars actualizadas
  useEffect(() => {
    (async () => {
      activity && setResRating(await getReviewsByActivityId(activity._id));
    })();
  }, [activity]);

  useEffect(() => {
    useRatingError(resRating, setRating, setResRating);
  }, [resRating]);

  useEffect(() => {}, [rating]);

  const handleToggleCreateReview = () => {
    setShowCreateReview((prevShowCreateReview) => !prevShowCreateReview);
  };

  const showReviewsHandleClick = () => {
    setShowReviews((activity) => !activity);
  };

  const reloadReviews = () => {
    (async () => {
      setResRating(await getReviewsByActivityId(activity._id));
    })();
    setShowReviews(true);
  };

  if (!activity) {
    return <div>No existe actividad</div>;
  }

  return (
    <div className="activity-detail">
      <h1>{activity.name}</h1>
      <p className="spots">Número de plazas: {activity.spots}</p>
      <p className="type">Tipo de actividad: {activity.type}</p>
      <p className="type"></p>
      <img src={activity.image} alt={activity.name} />
      <h3>Te contamos en qué consiste</h3>
      <p className="description">{activity.description}</p>
      <RatingStars
        rating={rating.avg}
        count={rating.data?.length || 0}
        showCount={true}
        showLinkReviews={true}
        showReviews={showReviewsHandleClick}
      />
      {user && (
        <>
          <button onClick={handleToggleCreateReview}>Crear Review</button>
          {showCreateReview && (
            <CreateReview
              activityId={activity._id}
              setShowCreateReview={setShowCreateReview}
              reloadReviews={reloadReviews}
              setActivity={setActivity}
            />
          )}
        </>
      )}
      <div>{showReviews && <Reviews reviews={rating.data} />}</div>
    </div>
  );
};

export default ActivityDetail;
