import './ToggleFavorite.css';

export const ToggleFavorite = ({ handleLike, isFav }) => {
  return (
    <button onClick={handleLike}>
      <span
        className={isFav ? 'material-symbols-outlined like' : 'material-symbols-outlined'}
      >
        favorite
      </span>
    </button>
  );
};

