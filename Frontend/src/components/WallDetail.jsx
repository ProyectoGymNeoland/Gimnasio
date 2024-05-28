import './ActivityDetail.css';
import "./WallDetail.css"
import React, { useEffect, useState } from 'react';
import { getWallById } from '../services/wall.service';

const WallDetail = ({ wall }) => {
  if (!wall) {
    return <div>Crear página 404 VER CON PEDRO...</div>;
  }

  const handleButtonClick = ()=>{
  navigate("/")
}

  return (
    <div className="activity-detail">
      <h1>{wall.name}</h1>
      <p className="spots">Número de plazas: {wall.spots}</p>
      <p className="type">Tipo de actividad: {wall.type}</p>
      <p className="type">
        Status:
        <span className={wall.status ? 'available' : 'not-available'}>
          {wall.status ? 'Disponible' : 'No disponible'}
        </span>
      </p>
      <img src={wall.image} alt={wall.name} />
      <h3>Te contamos en qué consiste</h3>
      <p className="description">{wall.content}</p>
      <button onClick={ handleButtonClick }>Comentarios</button>
      <button onClick={ handleButtonClick }>Reservar</button>
    </div>
  );
};

export default WallDetail;