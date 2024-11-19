import React, { useState } from 'react';
import "./Header.css";
import { NavLink } from "react-router-dom";
import { useAuth } from '../context/authContext';

export const HeaderNav = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='nav-container'>
      <nav className='navbar'>
        <img 
          src='https://res.cloudinary.com/dpw6wsken/image/upload/v1716381816/userProyect04FT/Logotipos/3Logotipo_copy-removebg-preview_sduzvg.png' 
          alt='Logo de la Nav' 
          className='logoNav' 
        />
        <div className={`hamburger-menu ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          
          <li><NavLink to="/" onClick={toggleMenu}>Inicio</NavLink></li>
          <li><NavLink to="/wall" onClick={toggleMenu}>Muro</NavLink></li>
          <li><NavLink to="/contact" onClick={toggleMenu}>Contacto</NavLink></li>
          <li><NavLink to="/activities/feed" onClick={toggleMenu}>Actividades</NavLink></li>
          <li><NavLink to="/calendar" onClick={toggleMenu}>Calendario</NavLink></li>
          <li><NavLink to="/profile" onClick={toggleMenu}>
            <img 
              src="https://res.cloudinary.com/dq186ej4c/image/upload/v1686125391/Change_User_icon-icons.com_55946_lypx2c.png" 
              alt="go to ChangePassword" 
              className="profileIconNav"
            />
          </NavLink></li>
          {(user?.rol === "superadmin" || user?.rol === "monitor" || user?.rol === "user") && 
            <li><NavLink to="/login" onClick={toggleMenu}>Logout</NavLink></li>}
        </ul>
      </nav>
    </div>
  );
};



