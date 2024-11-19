import { RatingStars } from './RatingStars';
import React, { useState } from 'react';
import { MessageModal } from './MessageModal';
import './Reviews.css';

export const Reviews = ({ reviews }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recipient, setRecipient] = useState('');

  const openModal = (owner) => {
    setRecipient(owner);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setRecipient('');
  };

  return (
    <div className="reviews-container">
      {reviews.map((review, index) => (
        <div key={index}>
          <hr />
          <div>
            <div className="review-header">
              <div className="review-owner">
                {review.owner && (
                  <>
                    <span className="texto">{review.owner.name}</span>
                    <a
                      className="review-chat-link"
                      onClick={() => openModal(review.owner)}
                    >
                      {' '}
                      Chat
                    </a>
                  </>
                )}
                {!review.owner && <span className="texto">Anónimo</span>}
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
      {isModalOpen && <MessageModal recipient={recipient} onClose={closeModal} />}
    </div>
  );
};
