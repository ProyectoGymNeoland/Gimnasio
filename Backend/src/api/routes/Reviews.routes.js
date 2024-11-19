const express = require("express");
const { isAuth } = require("../../middleware/auth.middleware");

const {
  createReview,
  getReviewsByActivity,
  getReviewsByUser,
  deleteReview,
} = require("../controllers/Review.controllers");

const ReviewRoutes = express.Router();

ReviewRoutes.post("/:activityId", [isAuth], createReview);
ReviewRoutes.get("/activity/:activityId", getReviewsByActivity);
ReviewRoutes.get("/:userId", [isAuth], getReviewsByUser);
ReviewRoutes.delete("/:id", [isAuth], deleteReview);

module.exports = ReviewRoutes;
