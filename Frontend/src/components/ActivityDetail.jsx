import './ActivityDetail.css';
import React, { useEffect, useState } from 'react';
import { getById } from '../services/activities.service';

const ActivityDetail = ({ activity }) => {
  if (!activity) {
    return <div>Crear página 404 VER CON PEDRO...</div>;
  }

  return (
    <div className="activity-detail">
      <h1>{activity.name}</h1>
      <p className="spots">Número de plazas: {activity.spots}</p>
      <p className="type">Tipo de actividad: {activity.type}</p>
      <p className="type">
        Status:
        <span className={activity.status ? 'available' : 'not-available'}>
          {activity.status ? 'Disponible' : 'No disponible'}
        </span>
      </p>
      <img src={activity.image} alt={activity.name} />
      <h3>Te contamos en qué consiste</h3>
      <p className="description">{activity.description}</p>
    </div>
  );
};

export default ActivityDetail;
