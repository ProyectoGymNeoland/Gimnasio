import React, { useState } from 'react';
import './GymServices.css'; // Importa el archivo CSS

const GymServices = () => {
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const services = [
    { 
        title: "PISTAS", 
        description: "Disfruta de nuestras pistas de tenis y pádel.", 
        icon: "https://res.cloudinary.com/dpw6wsken/image/upload/v1717259633/Padel_f6dhzk.png" 
    },
    { 
        title: "CLASES COLECTIVAS", 
        description: "Participa en nuestras clases colectivas para todos los niveles.", 
        icon: "https://res.cloudinary.com/dpw6wsken/image/upload/v1717259633/Maquinas_b9d9ua.png" 
    },
    { 
        title: "ASESORAMIENTO", 
        description: "Entrena con nuestros expertos y alcanza tus objetivos.", 
        icon: "https://res.cloudinary.com/dpw6wsken/image/upload/v1717259633/Monitor_shvuxv.png" 
    },
    { 
        title: "SALA DE MUSCULACIÓN", 
        description: "Aprovecha nuestra maquinaria de última generación.", 
        icon: "https://res.cloudinary.com/dpw6wsken/image/upload/v1717259633/Mancuerna_ohtvns.png" 
    },
    { 
        title: "CAFETERÍA", 
        description: "Pronto podrás disfrutar de nuestra nueva cafetería.", 
        icon: "https://res.cloudinary.com/dpw6wsken/image/upload/v1717259633/cafeteria_wydskk.png" 
    },
    { 
        title: "NUTRICIÓN", 
        description: "Asesoramiento nutricional personalizado próximamente.", 
        icon: "https://res.cloudinary.com/dpw6wsken/image/upload/v1717259633/stethoscope_jetcqs.png" 
    },
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
    <div className="gym-services" style={{ backgroundImage: 'url(https://res.cloudinary.com/dpw6wsken/image/upload/v1717408068/pexels-willpicturethis-1954524_lon9hj_crkgyo.png)', backgroundSize: 'cover' }}>
      <div className="service-title">
        SERVICIOS DE ENERGY CENTER
      </div>
      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-box" onClick={() => openModal(service)}>
            <img src={service.icon} alt={service.title} className="service-icon" />
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
