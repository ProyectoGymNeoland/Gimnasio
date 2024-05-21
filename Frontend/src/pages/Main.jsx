import { Link } from "react-router-dom"
import './Nav.css'; 

export const Main = () =>{
    return (
    <>
        <div className="nav-container">
        <nav className="navbar">
            <ul>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/muro">Muro</Link></li>
                <li><Link to="/contacto">Contacto</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/actividades">Actividades</Link></li>
            </ul>
        </nav>
        </div>
        <div>
            <main className="main-content">
                <h1>Pagina Main</h1>
            </main>
        </div>
        <div>
            <footer className="footer">
                <p>&copy; 2024 My Website. All rights reserved.</p>
            </footer>
        </div>
    </>
    )
}