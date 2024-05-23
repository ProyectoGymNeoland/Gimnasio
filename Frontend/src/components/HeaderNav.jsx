import React from 'react'
import "./Header.css"
import { NavLink } from "react-router-dom";

export const HeaderNav = () => {
  return (
    <div className='nav-container'> 
      <nav className='navbar'>
        <img src='https://res.cloudinary.com/dpw6wsken/image/upload/v1716412046/logofinal-removebg-preview_fm3ppj.png' alt='Logo de la Nav' className='logoNav'></img>
        <ul>
          <li><NavLink to="/">About</NavLink></li>
          <li><NavLink to="/wall">Muro</NavLink></li>
          <li><NavLink to="/contact">Contacto</NavLink></li>
          <li><NavLink to="/login">Login</NavLink></li>
          <li><NavLink to="/activities/feed">Actividades</NavLink></li>
          <li><NavLink to="/calendar">Calendario</NavLink></li>
          <li><NavLink to="/profile">
          <img src="https://res.cloudinary.com/dq186ej4c/image/upload/v1686125391/Change_User_icon-icons.com_55946_lypx2c.png" alt="go to ChangePassword" className="profileIconNav"/>
          </NavLink></li>
        </ul>
      </nav>
    </div>
  )
}
