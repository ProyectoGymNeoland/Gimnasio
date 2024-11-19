import './RatingStars.css';

export const RatingStars = ({
  rating,
  count,
  showCount,
  showLinkReviews,
  showReviews,
}) => {
  const filledStars = Math.round(rating);
  const emptyStars = 5 - filledStars;
  const arrayFilled = Array.from({ length: filledStars }, (_, index) => index + 1);
  const arrayEmpty = Array.from({ length: emptyStars }, (_, index) => index + 1);

  return (
    <div className="rating-stars">
      {arrayFilled.map((index) => (
        <span key={index} className="material-symbols-outlined star filled">
          star
        </span>
      ))}
      {arrayEmpty.map((index) => (
        <span key={index} className="material-symbols-outlined star empty">
          star
        </span>
      ))}
      {showCount && <span>({count})</span>}
      {showLinkReviews && (
        <span>
          <a onClick={showReviews}>Ver reviews</a>
        </span>
      )}
    </div>
  );
};
