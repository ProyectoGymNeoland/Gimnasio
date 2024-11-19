const Review = require("../models/Review.model");
const Activities = require("../models/Activities.model");

//! ------------------------------------------------------------------------
//? -----------------------------CREATE REVIEW------------------------------
//! ------------------------------------------------------------------------

const createReview = async (req, res) => {
  try {
    const { activityId } = req.params;
    const { rating, content } = req.body;
    const ownerId = req.user._id;

    const review = new Review({
      owner: ownerId,
      activities: activityId,
      rating,
      content,
    });

    await review.save();

    // agrega la review a la actividad
    await Activities.findByIdAndUpdate(activityId, {
      $push: { reviews: review._id },
    });

    res.status(201).json({
      new: review,
      activityId: await Activities.findById(activityId)
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      // Error de validación de datos
      res.status(400).json({ message: "Datos de la review no válidos", error });
    } else {
      res.status(500).json({ message: "Error creating review", error });
    }
  }
};

//! ------------------------------------------------------------------------
//? --------------------------GET REVIEW BY ACTIVITY------------------------
//! ------------------------------------------------------------------------

const getReviewsByActivity = async (req, res) => {
  try {
    const { activityId } = req.params;

    const reviews = await Review.find({ activities: activityId }).populate(
      "owner",
      "name"
    );

    let totalRating = 0;
    for (const review of reviews) {
      totalRating += review.rating;
    }

    const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

    const resp = {
      data: reviews,
      avg: averageRating,
    };

    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
};

//! ------------------------------------------------------------------------
//? ---------------------------GET REVIEW BY USER---------------------------
//! ------------------------------------------------------------------------

const getReviewsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const reviews = await Review.find({ owner: userId }).populate("activities");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//! ------------------------------------------------------------------------
//? ----------------------------DELETE REVIEW ------------------------------
//! ------------------------------------------------------------------------
/** Tenemos que borrar:
 * la review
 * quitarla de la actividad
 */

const deleteReview = async (req, res, next) => {
  try {
    await Review.syncIndexes();

    const { id } = req.params;
    const review = await Review.findByIdAndDelete(id);

    if (!review) {
      return res.status(404).json({ error: "Review no encontrada" });
    }
    if (await Review.findById(id)) {
      // si me la encuentra es que no se ha borrado
      return res.status(409).json({ error: "Review no borrada" });
    }
    try {
      await Activities.updateMany({ reviews: id }, { $pull: { reviews: id } });
    } catch (error) {
      return res.status(409).json({
        error: " Activities updateMany  --  reviews",
        message: error.message,
      });
    }
    return res.status(200).json();
  } catch (error) {
    return res.status(409).json({ error: error.message });
  }
};

module.exports = {
  createReview,
  getReviewsByActivity,
  getReviewsByUser,
  deleteReview,
};
