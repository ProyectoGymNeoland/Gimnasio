import React from 'react';
import "./Header.css"
import { NavLink } from "react-router-dom";

export const Header = ({children}) => {
  return (
    <header>
      {children}
    </header>
  );
};

export default Header;