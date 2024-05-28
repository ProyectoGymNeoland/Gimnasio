import { RatingStars } from './RatingStars';
import './Reviews.css';

export const Reviews = ({ reviews }) => {
  return (
    <div className="reviews-container">
      {reviews.map((review, index) => (
        <div key={index}>
          <hr />
          <div>
            <div className="review-header">
              <div className="review-owner">
                <span className="texto">{review.owner.name}</span>
                <a className="review-chat-link" onClick={console.log('Ir al chat')}>
                  {' '}
                  Chat
                </a>
              </div>
              <div className="review-rating">
                <RatingStars
                  rating={review.rating}
                  count={0}
                  showCount={false}
                  showLinkReviews={''}
                  showReviews={false}
                />
              </div>
            </div>
            <div>
              <span className="review-content texto">{review.content}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
