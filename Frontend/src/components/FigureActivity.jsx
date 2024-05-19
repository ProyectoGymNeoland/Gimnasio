import { Link } from 'react-router-dom';
import './FigureActivity.css';

const Figure = ({ activity }) => {
  return (
    <figure>
      <Link to={`/activities/${activity._id}`}>
        {activity.image && <img src={activity.image} alt={activity.name} width="200" />}
        <figcaption>
          <h2>{activity.name}</h2>
          <p>{activity.type}</p>
        </figcaption>
      </Link>
    </figure>
  );
};

export default Figure;
