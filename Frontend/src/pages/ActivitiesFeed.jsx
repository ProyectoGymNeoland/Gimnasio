import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useActivitiesFeedError } from '../hooks/useActivitiesFeedError';
import { getAllActivities, getByName } from '../services/activities.service';
import Figure from '../components/FigureActivity';
import './ActivitiesFeed.css';
import { Input } from '../components/Input';
import { useGetByNameError } from '../hooks';

export const ActivitiesFeed = () => {
  const [activities, setActivities] = useState([]);
  const [res, setRes] = useState({});
  const [searchRes, setSearchRes] = useState({});
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de la búsqueda

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

  useEffect(() => {
    console.log(activities)
  }, [activities]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      return;
    }
    (async () => {
      setSearchRes(await getByName(searchTerm));
    })();
  }, [searchTerm]);

  const handleSearch = async (term) => {
    setSearchTerm(term);
  };

  return (
    <div>
      <h1>Activities Feed</h1>
      <Input setValueInput={handleSearch} value={searchTerm} />
      <div id="containerActivitiesFeed">
        {activities.length > 0 &&
          activities.map((activity) => <Figure activity={activity} key={activity._id} />)}
        {activities.length === 0 && 'No se han encontrado actividades'}
      </div>
    </div>
  );
};
