import { updateToken } from '../utils';
import { extraConfig } from './gym.config';

//! ---------- GET BY ACTIVITY ID ---------- //

// nos muestra todas las reviews de una actividad específica
export const getReviewsByActivityId = async (activityId) => {
  const APIGeneral = extraConfig();
  return APIGeneral.get(`/reviews/activity/${activityId}`, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! ---------- CREATE REVIEW ---------- //
export const createReview = async (activityId, reviewData) => {
  const APIGeneral = extraConfig();
  return APIGeneral.post(`/reviews/${activityId}`, reviewData, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! ---------- GET REVIEW BY USER ---------- //

export const getReviewsByUser = async (userId) => {
  const APIGeneral = extraConfig();
  return APIGeneral.get(`/reviews/${userId}`, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! ------------- DELETE REVIEW -------------- //

export const deleteReview = async (reviewId) => {
  const APIGeneral = extraConfig();
  return APIGeneral.delete(`/reviews/${reviewId}`, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};
