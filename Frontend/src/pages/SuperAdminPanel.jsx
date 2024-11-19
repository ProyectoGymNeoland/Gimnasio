import React from 'react';
import { ButtonSuperAdminPanel } from '../components';
import './SuperAdminPanel.css';

export const SuperAdminPanel = () => {
  return (
    <div className="superadmin-panel">
      <div className="admin-panel-content">
        <h1>Panel de Administración</h1>
        <div className="admin-button-container">
          <ButtonSuperAdminPanel to="/activities/create">Crear Actividad</ButtonSuperAdminPanel>
          <ButtonSuperAdminPanel to="/activitiesList">Editar / Borrar Actividad</ButtonSuperAdminPanel>
          <ButtonSuperAdminPanel to="/createNewDay">Crear horarios y clases</ButtonSuperAdminPanel>
          <ButtonSuperAdminPanel to="/allContacts">Ver dudas usuarios</ButtonSuperAdminPanel>
        </div>
      </div>
    </div>
  );
};
