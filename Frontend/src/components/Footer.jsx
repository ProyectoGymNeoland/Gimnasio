import "./Footer.css";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithubSquare, faTwitterSquare, faLinkedin, faInstagramSquare } from '@fortawesome/free-brands-svg-icons';

export const Footer = ()=>{
    return(
    <>

           <footer>

        <div className="container-footer">
            <div className="box-footer-info">
                   <img className="foto" src="https://res.cloudinary.com/dpw6wsken/image/upload/v1716381816/userProyect04FT/Logotipos/3Logotipo_copy-removebg-preview_sduzvg.png" alt=""></img>
                    <p className="terms">  Este es nuestro proyecto de fin de bootcamp. Hemos realizado una aplicación de un gimnasio con diferentes secciones y un acercamiento a lo que podría ser una red social. Donde la gente comparta sus experiencias en el gimnasio.</p>
            </div>
            <div className="box-footer" id="box-footer1">
                <h2 id="title-footer">Ayuda</h2>
                <Link to="/contact" className="link-footer">Contáctanos</Link>
                <Link to="/" className="link-footer">Sobre Nosotros</Link>
                <p className="text-footer">Politicas de Privacidad</p>
                <p className="text-footer">Condiciones de uso</p>

            </div>

            <div className="box-footer">
                <h2 id="title-footer">Proyecto</h2>
                <a className="link-footer" href="https://github.com/ProyectoGymNeoland/Gimnasio" target="_blank">Github</a>
                <p className="text-footer">Documentación</p>
                <a className="link-footer" href="https://neoland.es/" target="_blank">Escuela</a>
                <p className="text-footer">Integrantes</p>
            </div>
<div className="box-footer">
                <h2 id="title-footer">Redes Sociales</h2>
                <a className="link-footer" href="https://linktr.ee/IntegrantesProyectoGym" target="_blank"><FontAwesomeIcon icon={faGithubSquare} />  Githubs</a>
                <p className="text-footer"><FontAwesomeIcon icon={faTwitterSquare} />  Twitter</p>
                <a className="link-footer" href="https://linktr.ee/linkedinintegrantesproyectogym" target="_blank"><FontAwesomeIcon icon={faLinkedin} />  Linkedins</a>
                <p className="text-footer"><FontAwesomeIcon icon={faInstagramSquare} />  Instagram</p>
            </div>

        </div>

        <div className="box-copyright">
            <hr className="line"/>
            <p className="copyright">Todos los derechos reservados © 2024 <b>ProyectoGym</b></p>
        </div>
    </footer>
    </>
    );
}