import { Link } from "react-router-dom"
import './Home.css'; 
import "./Nav.css"
import { About } from "../components";

export const Main = () =>{
    return (
      <>
        <div className="nav-container">
          <nav className="navbar">
            <ul>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <Link to="/muro">Muro</Link>
              </li>
              <li>
                <Link to="/contacto">Contacto</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/activities/feed">Actividades</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="main-container">
          <main className="main-content">
            <About />
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