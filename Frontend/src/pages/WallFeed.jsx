import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { getAllWalls, getWallByActivity } from '../services/wall.service';

import './ActivitiesFeed.css';
import './WallFeed.css';
import { Input } from '../components/Input';
import { useAuth } from '../context/authContext';
import { useWallsFeedError,  useWallByNameError } from '../hooks';
import { FigureWalls } from '../components';
import { ButtonCreateWall } from '../components/ButtonCreateWall';


export const WallFeed = () => {
  const [activities, setActivities] = useState([]);
  const [res, setRes] = useState({});
  const [searchRes, setSearchRes] = useState({});
  const [searchTerm, setSearchTerm] = useState(''); // estado para el término de la búsqueda
  const { user } = useAuth(); //cuando añado el toogleLike me traigo al user logueado con el contexto.

  useEffect(() => {
    (async () => {
      setRes(await getAllWalls());
    })();
  }, []);

  useEffect(() => {
    useWallsFeedError(res, setRes, setActivities);
  }, [res]);

  useEffect(() => {
    useWallByNameError(searchRes, setSearchRes, setActivities);
  }, [searchRes]);

  useEffect(() => {
    console.log(activities)
  }, [activities]);


  // useEffect(() => {
  //   if (searchTerm.trim() === '') {
  //     (async () => {
  //       setSearchRes(await getAllWalls());
  //     })();
  //   } else {
  //     (async () => {
  //       setSearchRes(await getWallByActivity(searchTerm));
  //     })();
  //   }
  // }, [searchTerm]);

  const handleSearch = async (term) => {
    setSearchTerm(term);
  };
//!añadir clase a div principal y actualizar css
  return (
    <div className="activities-feed">
      <h1>Wall Feed</h1>
      <Input setValueInput={handleSearch} value={searchTerm} />
      <div id="containerActivitiesFeed">
        {activities.length > 0 &&
          activities.map((wall) => (
            <FigureWalls
            wall={wall}
            key={wall._id}
            
            />
          ))}
        {activities.length === 0 && 'No se han encontrado actividades'}
      </div>
    </div>
  );
};
