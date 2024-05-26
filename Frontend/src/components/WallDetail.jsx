import './ActivityDetail.css';
import React, { useEffect, useState } from 'react';
import { getWallById } from '../services/wall.service';

const WallDetail = ({ wall }) => {
  if (!wall) {
    return <div>Crear página 404 VER CON PEDRO...</div>;
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
    </div>
  );
};

export default WallDetail;