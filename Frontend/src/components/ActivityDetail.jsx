// src/components/ActivityDetail.jsx
import React, { useEffect, useState } from 'react';
import { getById } from '../services/activities.service';

const ActivityDetail = ({ activity }) => {
    if (!activity) {
      return <div>Crear página 404 VER CON PEDRO...</div>;
    }
    
  return (
    <div className="activity-detail">
      <h1>{activity.name}</h1>
      <p>{activity.description}</p>
      <p>Número de plazas: {activity.spots}</p>
      <p>Tipo de actividad: {activity.type}</p>
      <p>Status: {activity.status ? 'Disponible' : 'No disponible'}</p>
      <img src={activity.image} alt={activity.name} />
      <h3>Descripción pendiente de añadir al formulario y al backend</h3>
      
    </div>
  );
};

export default ActivityDetail;
