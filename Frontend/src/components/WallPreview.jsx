import React from 'react';
import './WallPreview.css';

export const WallPreview = () => {
    const walls = [
      {
        name: 'Nutrición',
        image:
          'https://res.cloudinary.com/dpw6wsken/image/upload/v1717280089/Proyecto_nuevo_7_wlzqdu.png',
        description:
          'Recetas saludables y guías alimenticias para complementar tu entrenamiento y mejorar tu bienestar.',
      },
      {
        name: 'Media Maratón',
        image:
          'https://res.cloudinary.com/dpw6wsken/image/upload/v1717280090/Proyecto_nuevo_6_l5sn9m.png',
        description:
          'Únete al muro para compartir tus sesiones de entrenamiento para la media maratón. ¡Vamos a mejorar nuestras marcas personales!',
      },
      {
        name: '¡Verano!',
        image:
          'https://res.cloudinary.com/dpw6wsken/image/upload/v1717280085/Proyecto_nuevo_8_jg051l.png',
        description:
          'Si quieres estar en formar para el verano, en este grupo los monitores te dan los mejores consejos y recomendaciones.',
      },
      {
        name: 'Las kdd',
        image:
          'https://res.cloudinary.com/dpw6wsken/image/upload/v1717280085/Proyecto_nuevo_9_kytmjc.png',
        description:
          'Nos encanta el deporte y hacer actividades al aire libre. Aquí entre todo hacemos los mejores planes para disfrutar entrenando',
      },
    ];

    return (
        <div className="wall-preview-container">
            <h3>¿Y tú que opinas? compartelo en el muro del gym</h3>
            <div className="walls-grid">
                {walls.map((wall, index) => (
                    <div key={index} className="wall-card">
                        <img src={wall.image} alt={wall.name} />
                        <h3>{wall.name}</h3>
                        <p>{wall.description}</p>
                        <a href="/wall">➔</a>
                    </div>
                ))}
            </div>
        </div>
    );
};
