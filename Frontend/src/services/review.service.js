import { updateToken } from '../utils';
import { APIGym } from './gym.config';

//! ---------- GET BY ACTIVITY ID ---------- //

// nos muestra todas las reviews de una actividad específica
export const getReviewsByActivityId = async (activityId) => {
  return APIGym.get(`/reviews/activity/${activityId}`, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! ---------- CREATE REVIEW ---------- //
export const createReview = async (activityId, reviewData) => {
  return APIGym.post(`/reviews/${activityId}`, reviewData, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};
