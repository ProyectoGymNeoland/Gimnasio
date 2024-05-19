import "./FigureActivity.css"


const Figure = ({ activity }) => {
  return (
    <figure>
      {activity.image && <img src={activity.image} alt={activity.name} width="200" /> }
      <figcaption>
        <h2>{activity.name}</h2>
        <p>{activity.type}</p>
      </figcaption>
    </figure>
  );
};

export default Figure;
