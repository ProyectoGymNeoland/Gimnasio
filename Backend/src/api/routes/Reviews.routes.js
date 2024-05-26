const express = require("express");
const { isAuth } = require("../../middleware/auth.middleware");

const {
  createReview,
  getReviewsByActivity,
} = require("../controllers/Review.controllers");

const ReviewRoutes = express.Router();

ReviewRoutes.post("/:activityId", [isAuth], createReview);
ReviewRoutes.get("/activity/:activityId", [isAuth], getReviewsByActivity);

module.exports = ReviewRoutes;
