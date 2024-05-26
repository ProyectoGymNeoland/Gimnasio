import React from 'react'
import "./Header.css"
import { NavLink } from "react-router-dom";
import { useAuth } from '../context/authContext';

export const HeaderNav = () => {

  const {user} = useAuth();  
  return (
    <div className='nav-container'> 
      <nav className='navbar'>
        <img src='https://res.cloudinary.com/dpw6wsken/image/upload/v1716381816/userProyect04FT/Logotipos/3Logotipo_copy-removebg-preview_sduzvg.png' alt='Logo de la Nav' className='logoNav'></img>
        <ul>
          <li><NavLink to="/">About</NavLink></li>
          <li><NavLink to="/wall">Muro</NavLink></li>
          <li><NavLink to="/contact">Contacto</NavLink></li>
          <li><NavLink to="/activities/feed">Actividades</NavLink></li>
          <li><NavLink to="/calendar">Calendario</NavLink></li>
          <li><NavLink to="/profile">
          <img src="https://res.cloudinary.com/dq186ej4c/image/upload/v1686125391/Change_User_icon-icons.com_55946_lypx2c.png" alt="go to ChangePassword" className="profileIconNav"/>
          </NavLink></li>
          {(user?.rol == "superadmin" || user?.rol == "monitor" || user?.rol == "user") && <li><NavLink to="/login">Logout</NavLink></li>}
        </ul>
      </nav>
    </div>
  )
}


