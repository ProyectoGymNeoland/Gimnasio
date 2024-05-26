import './RatingStars.css';

export const RatingStars = ({ rating }) => {
  const filledStars = Math.round(rating);
  const emptyStars = 5 - filledStars;
  const arrayFilled = Array.from({ length: filledStars }, (_, index) => index + 1);
  const arrayEmpty = Array.from({ length: emptyStars }, (_, index) => index + 1);

  return (
    <div className="rating-stars">
      {arrayFilled.map((index) => (
        <span key={index} className="star filled">
          ★
        </span>
      ))}
      {arrayEmpty.map((index) => (
        <span key={index} className="star empty">
          ☆
        </span>
      ))}
    </div>
  );
};


