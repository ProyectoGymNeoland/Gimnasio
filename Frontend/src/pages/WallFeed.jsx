import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { getAllWalls, getWallByName } from '../services/wall.service';
import './ActivitiesFeed.css';
import './WallFeed.css';
import { Input } from '../components/Input';
import { useAuth } from '../context/authContext';
import { useWallsFeedError,  useWallByNameError } from '../hooks';
import { FigureWalls } from '../components';


export const WallFeed = () => {
  const [activities, setActivities] = useState([]);
  const [res, setRes] = useState(null);
  const [inputFilter, setInputFilter] = useState(null)
 
  useEffect(() => {
    (async () => {
      setRes(await getAllWalls());
    })();
  }, []);

  useEffect(() => {
    useWallsFeedError(res, setRes, setActivities);
  }, [res]);

  const handleSearch = async (term) => {
   const filterData = activities.filter((item)=> item.name.toLowerCase().includes(term.toLowerCase()) )
   setInputFilter(filterData)
  };
//!añadir clase a div principal y actualizar css
  return (
    <div className="activities-feed">
      <h1>Wall Feed</h1>
        <Input
        setValueInput={handleSearch}
        id={'searchWall'}
        placeholder={'Yoga, Pilates ...'}
      />
      <div id="containerActivitiesFeed">
        {inputFilter !== null ? (inputFilter.map((wall) => (
            <FigureWalls
            wall={wall}
            key={wall._id}
            
            />
          ))) : activities.length > 0 &&
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
