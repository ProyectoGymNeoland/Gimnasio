import { NavProfile, NavUser, UserProfileCard } from '../components';
import { useAuth } from '../context/authContext';
import './Profile.css';

export const Profile = () => {
  const { user } = useAuth(); //obtenemos el usuario del contexto

  if (!user) {
    return <div>No se ha encontrado el usuario</div>; // Manejo en caso que no haya usuario
  }

  return (
    <div>
      <UserProfileCard user={user} />
      <NavUser/>
    </div>
  );
};
