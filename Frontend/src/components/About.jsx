import React, { useEffect, useState } from 'react';
import "./About.css"


export const About = () => {
  
  return (//ponemos el id para que al hacer referencia a el en el enlace de la nav, nos redirija a este componente
    <div id="about" className='about-container' > 
      <h1>About us..</h1>
      <div className="contenedor">
            <img className='image' src="https://res.cloudinary.com/dpw6wsken/image/upload/v1716308909/female-bodybuilder-training-biceps-with-dumbbells_rhq38z.jpg"></img>
       
            <span className="right-aligned">¿Qué es Lorem Ipsum?

            Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.
            
            Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.</span>
     
      </div>
      <div className='about-info'>
        <div className='info-btn'>
            <button>Nuestros Valores</button>
            <button>Nuestros Objetivos</button>
        </div>
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
