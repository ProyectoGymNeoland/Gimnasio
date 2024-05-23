import React, { useState } from 'react';
import './GymServices.css'; // Importa el archivo CSS

const GymServices = () => {
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const services = [
    { title: "PISTAS", description: "Disfruta de nuestras pistas de tenis y pádel." },
    { title: "CLASES COLECTIVAS", description: "Participa en nuestras clases colectivas para todos los niveles." },
    { title: "ENTRENADORES ESPECIALIZADOS", description: "Entrena con nuestros expertos y alcanza tus objetivos." },
    { title: "MAQUINARIA AVANAZADA", description: "Aprovecha nuestra maquinaria de última generación." },
    { title: "PROXIMAMENTE: cafetería", description: "Pronto podrás disfrutar de nuestra nueva cafetería." },
    { title: "PROXIMAMENTE: nutricionista", description: "Asesoramiento nutricional personalizado próximamente." },
  ];

  const openModal = (service) => {
    setModalContent(service.description);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <div className="gym-services" style={{ backgroundImage: 'url(https://res.cloudinary.com/dpw6wsken/image/upload/v1716117750/userProyect04FT/fmfbtsi8dq2dfpctj2a4.jpg)', backgroundSize: 'cover' }}>
        <div className="service-title">
        SERVICIOS DE ENERGY CENTER
      </div>
      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-box" onClick={() => openModal(service)}>
            {service.title}
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={closeModal}>&times;</span>
            <p>{modalContent}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GymServices;
