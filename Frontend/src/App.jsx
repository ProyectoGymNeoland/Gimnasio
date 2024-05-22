import { Outlet } from 'react-router-dom';
import './App.css';
import { Link } from "react-router-dom"

function App() {
  return (
    
       <>
    <div className="nav-container">
    <nav className="navbar">
        <ul>
            <li><a href="#about">About</a></li>
            <li><Link to="/muro">Muro</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/actividades">Actividades</Link></li>
        </ul>
    </nav>
    </div>
    <div className="main-container">
        <main className="main-content">
            <Outlet />
        </main>
    </div>
    <div className="footer-container">
        <footer className="footer">
            <p>&copy; 2024 My Website. All rights reserved.</p>
        </footer>
    </div>
</>
    
  );
}

export default App;
