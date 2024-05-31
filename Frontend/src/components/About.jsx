import React, { useEffect, useState } from 'react';
import "./About.css"


export const About = () => {
  
  return (//ponemos el id para que al hacer referencia a el en el enlace de la nav, nos redirija a este componente
    <div id="about" className='about-container' > 
      
      <div className="contenedor">
            <img className='image' src="https://res.cloudinary.com/dpw6wsken/image/upload/v1716626252/ajtcg3vozalj69g3wefh.webp"></img>
    
      </div>
      <div className='about-info'>
        
        <div className='info-card'>
            <div className='card'>
                <h3>Personalización</h3>
                <span>Todos nuestros monitores, actividades y demás están orientados a la personalización de cada miembro del gimnasio de manera que puedas cumplir tus objetivos</span>
            </div>
            <div className='card'>
                <h3>Esfuerzo</h3>
                <span>Todos nuestros monitores, actividades y demás están orientados a la personalización de cada miembro del gimnasio de manera que puedas cumplir tus objetivos</span>
            </div>
            <div className='card'>
                <h3>Rendimiento</h3>
                <span>Todos nuestros monitores, actividades y demás están orientados a la personalización de cada miembro del gimnasio de manera que puedas cumplir tus objetivos</span>
            </div>
            <div className='card'>
                <h3>Salud</h3>
                <span>Todos nuestros monitores, actividades y demás están orientados a la personalización de cada miembro del gimnasio de manera que puedas cumplir tus objetivos</span>
            </div>
        </div>
      </div>
      
    </div>
  );
  }
