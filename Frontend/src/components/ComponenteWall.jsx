import React, { useState } from 'react'
import "./ComponenteWall.css"
import "./ButtonCreateWall.css"
import { ButtonCreateWall } from './ButtonCreateWall';
import { createWall } from '../services/wall.service';
import { useAuth } from '../context/authContext';
import { WallFeed } from '../pages/WallFeed';

export const ComponenteWall = () => {
  const {user} = useAuth()
  
  const [walls, setWalls] = useState([]);

  const handleCreateWall = async (wallData) => {
    try {
      const response = await createWall(wallData);
      if (response && response.data) {
        setWalls([...walls, response.data]);
      } else {
        console.error('Error creating wall:', response);
      }
    } catch (error) {
      console.error('Error creating wall:', error);
    }
  };

  
  return (
    <div className='contenedor-wall'>
      {user?.rol == "monitor" && <ButtonCreateWall onCreateWall={handleCreateWall}></ButtonCreateWall>}
      {/* {walls.map((wall, index) => (
        <div
          key={index}
          className='wall-item'
          style={{ backgroundImage: `url(${wall.image})` }}
        >
          <h3>{wall.name}</h3>
          <p>{wall.content}</p>
        </div>
      ))} */}
              <WallFeed></WallFeed>
    </div>
  )
}

