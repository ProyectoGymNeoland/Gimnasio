import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import './UserActivitiesFav.css';

import { ToggleFavorite } from './ToggleFavorite';

export const UserActivitiesFav = () => {
  const { user } = useAuth();
  /**  const [like, setLike] = useState(false);
  const [res, setRes] = useState({});


  useEffect(() => {
    useToggleLikeActivity(res, setRes, login, user, setActivities);
  }, [res]);

  const handleLike = async () => {
    setRes(await toggleLikeActivity(activity._id));
  };

    useEffect(() => {}, [like]);
*/

  return (
    <div className="user-activities-fav">
      <h2>Mis actividades favoritas</h2>
      {user?.activitiesFav?.length === 0 && (
        <p>
          Aún no tienes actividades favoritas. <br></br>Ve a la
          <a href="/activities/feed">página de actividades</a> y dale a like 🧡!
        </p>
      )}
      {user?.activitiesFav?.length > 0 &&
        user.activitiesFav?.map((activity) => (
          <div key={activity._id}>
            <h3>{activity.name}</h3>
            <Link to={`/activities/${activity._id}`}>
              {activity.image && <img src={activity.image} alt={activity.name} />}
            </Link>
          </div>
        ))}
    </div>
  );
};
