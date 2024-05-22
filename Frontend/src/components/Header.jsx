import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.css"

const Header = () => {
  return (
    <header>
        <div className='nav-container'> 
      <nav className='navbar'>
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/muro">Muro</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/actividades">Actividades</Link></li>
        </ul>
      </nav>
      </div>
    </header>
  );
};

export default Header;