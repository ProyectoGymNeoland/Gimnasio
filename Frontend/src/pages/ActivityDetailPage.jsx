import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getById } from '../services/activities.service';
import ActivityDetail from '../components/ActivityDetail';
import { useActivityDetail } from '../hooks/useActivityDetail';

export const ActivityDetailPage = () => {
  const { idActivity } = useParams(); // Obtenemos el ID de la actividad de los parámetros de la URL
  const [activity, setActivity] = useState(null);
  const [res, setRes] = useState({});

  let navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setRes(await getById(idActivity));
    })();
  }, [idActivity]);

  useEffect(() => {
    useActivityDetail(res, setRes, setActivity);
  }, [res]);

  return (
    <div>
      <ActivityDetail activity={activity} setActivity={setActivity} />
      <a onClick={() => navigate(-1)}> Volver </a>
    </div>
  );
};
