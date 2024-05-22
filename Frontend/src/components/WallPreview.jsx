import React from 'react';
import './WallPreview.css';

export const WallPreview = () => {
    const walls = [
        { name: 'Spinning', image: 'https://res.cloudinary.com/dpw6wsken/image/upload/v1716117711/userProyect04FT/yph84l7hq7labooae4ix.jpg', description: 'Sample text. Click to select the text box. Click again or double click to start editing the text.' },
        { name: 'Zumba', image: 'https://res.cloudinary.com/dpw6wsken/image/upload/v1716117671/userProyect04FT/da1o53gqwk2gvbzwyfdv.jpg', description: 'Sample text. Click to select the text box. Click again or double click to start editing the text.' },
        { name: 'Pilates', image: 'https://res.cloudinary.com/dpw6wsken/image/upload/v1716071439/userProyect04FT/huyji6qdmfpdo5yaeusr.jpg', description: 'Sample text. Click to select the text box. Click again or double click to start editing the text.' },
        { name: 'Padel', image: 'https://res.cloudinary.com/dpw6wsken/image/upload/v1714256638/userProyect04FT/kfavphqgwy583tv8bnpf.jpg', description: 'Sample text. Click to select the text box. Click again or double click to start editing the text.' },
    ];

    return (
        <div className="wall-preview-container">
            <h2>MUROS</h2>
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
