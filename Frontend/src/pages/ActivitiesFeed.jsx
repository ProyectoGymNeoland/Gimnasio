import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useActivitiesFeedError } from '../hooks/useActivitiesFeedError';
import { getAllActivities } from '../services/activities.service';
import Figure from '../components/FigureActivity';
import "./ActivitiesFeed.css"

export const ActivitiesFeed = () => {
  const [activities, setActivities] = useState([]);
  const [res, setRes] = useState({});


  useEffect(() => {
    (async ()=> {
      setRes(await getAllActivities());
    })();
  }, []);

  useEffect(()=>{
    useActivitiesFeedError(res, setRes, setActivities);
  }, [res]);

  useEffect(() => {
  }, [activities]);


  return (
    <div>
      <h1>Activities Feed</h1>
      <div id="containerActivitiesFeed">
        {activities.length > 0 &&
          activities.map((activity) => <Figure activity={activity} key={activity._id} />)}
        {activities.length == 0 && 'No hay actividades'}
      </div>
    </div>
  );
};


