import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useActivitiesFeedError } from '../hooks/useActivitiesFeedError';
import { getAllActivities, getByName } from '../services/activities.service';
import './ActivitiesFeed.css';
import { Input } from '../components/Input';
import { useGetByNameError } from '../hooks';
import { useAuth } from '../context/authContext';
import Figure from '../components/FigureActivity';


export const ActivitiesFeed = () => {
  const [activities, setActivities] = useState([]);
  const [res, setRes] = useState({});
  const [searchRes, setSearchRes] = useState({});
  const [searchTerm, setSearchTerm] = useState(''); // estado para el término de la búsqueda
  const { user } = useAuth(); //cuando añado el toogleLike me traigo al user logueado con el contexto.

  useEffect(() => {
    (async () => {
      setRes(await getAllActivities());
    })();
  }, []);

  useEffect(() => {
    useActivitiesFeedError(res, setRes, setActivities);
  }, [res]);

  useEffect(() => {
    useGetByNameError(searchRes, setSearchRes, setActivities);
  }, [searchRes]);

  useEffect(() => {}, [activities]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      (async () => {
        setSearchRes(await getAllActivities());
      })();
    } else {
      (async () => {
        setSearchRes(await getByName(searchTerm));
      })();
    }
  }, [searchTerm]);

  const handleSearch = async (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="activities-feed">
      
      <Input
        setValueInput={handleSearch}
        value={searchTerm}
        id={'searchActivity'}
        placeholder={'Zumba, Yoga, ...'}
      />
      <div id="containerActivitiesFeed1">
        {activities.length > 0 &&
          activities
            .filter((activity) => activity.status === true) // filtra solo las actividades con estado true
            .map((activity) => (
              <Figure
                activity={activity}
                key={activity._id}
                user={user} //pasamos el usuario como prop
                setActivities={setActivities}
              />
            ))}
        {activities.length === 0 && 'No se han encontrado actividades'}
      </div>
    </div>
  );
};
