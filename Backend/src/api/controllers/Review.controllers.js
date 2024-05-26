const Review = require("../models/Review.model");
const Activities = require("../models/Activities.model");

// Crear una review
const createReview = async (req, res) => {
   try {
     const { activityId } = req.params;
     const { rating, content } = req.body;
     const ownerId = req.user._id; // Asumiendo que el id del usuario viene del token de autenticación

     const review = new Review({
       owner: ownerId,
       activity: activityId,
       rating,
       content,
     });

     await review.save();

     // Agregar la review a la actividad
     await Activities.findByIdAndUpdate(activityId, {
       $push: { reviews: review._id },
     });

     res.status(201).json(review);
   } catch (error) {
     res.status(500).json({ message: "Error creating review", error });
   }
};

// Obtener todas las reviews de una actividad
const getReviewsByActivity = async (req, res) => {
  try {
    const { activityId } = req.params;

    const reviews = await Review.find({ activity: activityId }).populate(
      "owner",
      "name"
    );

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
};

module.exports = {
  createReview,
  getReviewsByActivity,
  // Otras funciones de controlador
};
