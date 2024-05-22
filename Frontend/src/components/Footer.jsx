import "./Footer.css";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithubSquare, faTwitterSquare, faLinkedin, faInstagramSquare } from '@fortawesome/free-brands-svg-icons';

export const Footer = ()=>{
    return(
    <>

           <footer>

        <div className="container-footer">
            <div className="box-footer">
                <div className="logo">
                   <img className="foto" src="https://res.cloudinary.com/dpw6wsken/image/upload/v1716381816/3Logotipo_copy-removebg-preview_sduzvg.png" alt=""></img>
                </div>
                <div>
                    <p className="terms">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas impedit cum cumque velit libero officiis quam doloremque reprehenderit quae corporis! Delectus architecto officia praesentium atque laudantium, nam deleniti sapiente deserunt.</p>
                </div>
            </div>
 
<div className="box-footer">
                <h2 className="title-footer">Ayuda</h2>
                <Link to="/contact" className="link-footer">Contactanos</Link>
                <Link to="/" className="link-footer">Sobre Nosotros</Link>
                <p className="text-footer">Politicas de Privacidad</p>

            </div>

            <div className="box-footer">
                <h2 className="title-footer">Proyecto</h2>
                <a className="link-footer" href="https://github.com/ProyectoGymNeoland/Gimnasio" target="_blank">Github</a>
                <a className="link-footer" href="#" target="_blank">Documentación</a>
                <a className="link-footer" href="https://neoland.es/" target="_blank">Escula</a>
                <a className="link-footer" href="#" target="_blank">Integrantes</a>
            </div>

            <div className="box-footer">
                <h2 className="title-footer">Redes Sociales</h2>
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