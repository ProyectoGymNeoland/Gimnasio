const express = require("express");
const { isAuth } = require("../../middleware/auth.middleware");

const {
  createReview,
  getReviewsByActivity,
  getReviewsByUser,
} = require("../controllers/Review.controllers");

const ReviewRoutes = express.Router();

ReviewRoutes.post("/:activityId", [isAuth], createReview);
ReviewRoutes.get("/activity/:activityId", getReviewsByActivity);
ReviewRoutes.get("/:userId", [isAuth], getReviewsByUser);


module.exports = ReviewRoutes;
