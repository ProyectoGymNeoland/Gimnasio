import React from 'react';
import './WallPreview.css';

export const WallPreview = () => {
    const walls = [
        { name: 'Spinning', image: 'https://res.cloudinary.com/dpw6wsken/image/upload/v1716590090/userProyect04FT/Actividades%20y%20Monitores/35_tssbuj.webp', description: 'Sample text. Click to select the text box. Click again or double click to start editing the text.' },
        { name: 'Zumba', image: 'https://res.cloudinary.com/dpw6wsken/image/upload/v1716590055/userProyect04FT/Actividades%20y%20Monitores/41_pcgpqi.webp', description: 'Sample text. Click to select the text box. Click again or double click to start editing the text.' },
        { name: 'Pilates', image: 'https://res.cloudinary.com/dpw6wsken/image/upload/v1716589153/userProyect04FT/Actividades%20y%20Monitores/14_bwoqlf.webp', description: 'Sample text. Click to select the text box. Click again or double click to start editing the text.' },
        { name: 'Padel', image: 'https://res.cloudinary.com/dpw6wsken/image/upload/v1716590061/userProyect04FT/Actividades%20y%20Monitores/40_vjolyz.webp', description: 'Sample text. Click to select the text box. Click again or double click to start editing the text.' },
    ];

    return (
        <div className="wall-preview-container">
            
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
