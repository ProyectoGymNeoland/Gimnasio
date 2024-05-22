import React, { useState } from 'react'
import "./ComponenteWall.css"
import { ButtonCreateWall } from './ButtonCreateWall';
import { createWall } from '../services/wall.service';

export const ComponenteWall = () => {
  
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
      <ButtonCreateWall onCreateWall={handleCreateWall} />
      {walls.map((wall, index) => (
        <div
          key={index}
          className='wall-item'
          style={{ backgroundImage: `url(${wall.image})` }}
        >
          <h3>{wall.name}</h3>
          <p>{wall.content}</p>
        </div>
      ))}
    </div>
  )
}

