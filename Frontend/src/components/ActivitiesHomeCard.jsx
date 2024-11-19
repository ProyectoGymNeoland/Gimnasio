// src/components/ActivitiesHomeCard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllActivities } from '../services/activities.service';
import { useActivitiesFeedError } from '../hooks';
import './ActivitiesHomeCard.css';

export const ActivitiesHomeCard = () => {
  const [activities, setActivities] = useState([]);
  const [res, setRes] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // efecto que llama al servicio para cargar las actividades, al montar el componente
    (async () => {
      setRes(await getAllActivities()); //cuando recibe la respuesta setea el res
    })();
  }, []);

  /**cuando recibe la respuesta, que cambia el res haciendo un setRes (linea 15),
   * actualiza las actividades*/
  useEffect(() => {
    useActivitiesFeedError(res, setRes, setActivities); //usamos un custom hook que maneja la respuesta, y actualiza las activitys
  }, [res]); // cada vez que la res cambia, se ejecuta este useEffect.

  useEffect(() => {
    console.log(activities);
  }, [activities]); //si lo anterior da un 200, modifica la respueta, el array de dependencias "escucha", y entones se repinta.

  const handleActivityClick = (id) => {
    navigate(`/activities/${id}`);
  };

  return (
    <div className="activities-home-card-container">
      <h3>Nuestras Actividades</h3>
      <div className="activities-gallery">
        {activities.length > 0 &&
          activities.slice(0, 6).map((activity) => (
            <div
              className="activity-card"
              key={activity._id}
              onClick={() => handleActivityClick(activity._id)}
            >
              <img src={activity.image} alt={activity.name} className="activity-image" />
              <div className="activity-name">{activity.name}</div>
            </div>
          ))}
        {activities.length === 0 && 'No se han encontrado actividads'}
      </div>
    </div>
  );
};
