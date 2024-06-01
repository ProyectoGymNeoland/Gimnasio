import React from 'react';
import './WallPreview.css';

export const WallPreview = () => {
    const walls = [
        { name: 'Spinning', image: 'https://res.cloudinary.com/dpw6wsken/image/upload/v1717280089/Proyecto_nuevo_7_wlzqdu.png', description: 'Sample text. Click to select the text box. Click again or double click to start editing the text.' },
        { name: 'Zumba', image: 'https://res.cloudinary.com/dpw6wsken/image/upload/v1717280090/Proyecto_nuevo_6_l5sn9m.png', description: 'Sample text. Click to select the text box. Click again or double click to start editing the text.' },
        { name: 'Pilates', image: 'https://res.cloudinary.com/dpw6wsken/image/upload/v1717280085/Proyecto_nuevo_8_jg051l.png', description: 'Sample text. Click to select the text box. Click again or double click to start editing the text.' },
        { name: 'Padel', image: 'https://res.cloudinary.com/dpw6wsken/image/upload/v1717280085/Proyecto_nuevo_9_kytmjc.png', description: 'Sample text. Click to select the text box. Click again or double click to start editing the text.' },
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
