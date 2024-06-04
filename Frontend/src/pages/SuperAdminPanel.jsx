import React from 'react';
import { ButtonSuperAdminPanel } from '../components';
import './SuperAdminPanel.css';

export const SuperAdminPanel = () => {
  return (
    <div className="superadmin-panel">
      <div className="admin-panel-content">
        <h1>SuperAdmin Panel</h1>
        <div className="admin-button-container">
          <ButtonSuperAdminPanel to="/activities/create">Crear Actividad</ButtonSuperAdminPanel>
          <ButtonSuperAdminPanel to="/activitiesList">Editar / Borrar Actividad</ButtonSuperAdminPanel>
          <ButtonSuperAdminPanel to="/createWallForm">Crear Muro</ButtonSuperAdminPanel>
          <ButtonSuperAdminPanel to="/createNewDay">Crear horarios y clases</ButtonSuperAdminPanel>
        </div>
      </div>
    </div>
  );
};
