import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import WallDetail from '../components/WallDetail';
import { useWallDetail } from '../hooks/useWallDetail';
import { getWallById } from '../services/wall.service';

export const WallDetailPage = () => {
  const { wallId } = useParams(); // Obtenemos el ID de la actividad de los parámetros de la URL
  const [activity, setActivity] = useState(null);
  const [res, setRes] = useState({});

  useEffect(() => {
    (async () => {
      setRes(await getWallById(wallId));
    })();
  }, [wallId]);

  useEffect(() => {
    useWallDetail(res, setRes, setActivity);
  }, [res]);

  return (
    <div>
      <WallDetail wall={activity} wallId={wallId}/>
    </div>
    );
};
