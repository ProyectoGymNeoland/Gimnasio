import React from 'react'
import "./Header.css"
import { NavLink } from "react-router-dom";

export const HeaderNav = () => {
  return (
    <div className='nav-container'> 
      <nav className='navbar'>
        <img src='https://res.cloudinary.com/dpw6wsken/image/upload/v1716316187/logofinal_csiazn.png' alt='Logo de la Nav' className='logoNav'></img>
        <ul>
          <li><NavLink to="/">About</NavLink></li>
          <li><NavLink to="/wall">Muro</NavLink></li>
          <li><NavLink to="/contact">Contacto</NavLink></li>
          <li><NavLink to="/login">Login</NavLink></li>
          <li><NavLink to="/activities/feed">Actividades</NavLink></li>
          <li><NavLink to="/calendar">Calendario</NavLink></li>
        </ul>
      </nav>
    </div>
  )
}
