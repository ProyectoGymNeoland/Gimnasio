import './CreateReview.css';
import { useEffect, useState } from 'react';
import { createReview } from '../services/review.service';
import { useReviewsError } from '../hooks';
import { useForm } from 'react-hook-form';

export const CreateReview = ({
  activityId,
  setShowCreateReview,
  reloadReviews,
  setActivity,
}) => {
  const [reviewText, setReviewText] = useState('');
  const [res, setRes] = useState({});

  const { register, handleSubmit } = useForm();

  const formSubmit = async (formData) => {
    console.log('se ejecuta el form');

    try {
      setRes(await createReview(activityId, formData));
    } catch (error) {
      console.error('Error al crear la revisión:', error.message); //!quitar
    }
  };

  useEffect(() => {
    useReviewsError(res, setRes, setShowCreateReview, reloadReviews, setActivity); //usamos un custom hook que maneja la respuesta, y actualiza las activitys
  }, [res]); // cada vez que la res cambia, se ejecuta este useEffect.

  return (
    <form className="create-review-form" onSubmit={handleSubmit(formSubmit)}>
      <label htmlFor="rating">Rating:</label>
      <select
        id="rating"
        name="rating"
        required
        {...register('rating', { required: true })}
      >
        <option value="">Selecciona una valoración</option>
        <option value="1">1 estrella</option>
        <option value="2">2 estrellas</option>
        <option value="3">3 estrellas</option>
        <option value="4">4 estrellas</option>
        <option value="5">5 estrellas</option>
      </select>

      <label htmlFor="reviewText">Review:</label>
      <textarea
        id="reviewText"
        name="content"
        required
        {...register('content', { required: true })}
      ></textarea>

      <button type="submit">Enviar</button>
    </form>
  );
};
