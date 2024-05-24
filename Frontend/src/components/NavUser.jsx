import React, { useState } from "react";
import "./NavUser.css";
import { ActivitiesFeed } from "../pages/ActivitiesFeed"; // Ajusta la ruta según tu estructura de archivos
import { ChatComponent } from "./ChatComponent";

export const NavUser = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  const renderContent = () => {
    switch (activeComponent) {
      case 'activities':
        return <ActivitiesFeed />;
      case 'reviews':
        return <div>Reviews Content</div>; // Puedes reemplazar esto con el componente correspondiente
      case 'books':
        return <div>Books Content</div>;
      case 'chats':
        return <ChatComponent />;
      case 'instructors':
        return <div>Instructors Content</div>;
      default:
        return <div>Selecciona una opción</div>;
    }
  };

  return (
    <div className="form-wrap">
      <div className="form-group user-nav">
        <button className="btn" id="nav-chat" onClick={() => setActiveComponent('chats')}>Chats</button>
        <button className="btn" id="nav-review" onClick={() => setActiveComponent('reviews')}>Reviews</button>
        <button className="btn" id="nav-books" onClick={() => setActiveComponent('books')}>Books</button>
        <button className="btn" id="nav-activitiesfav" onClick={() => setActiveComponent('activities')}>Activities</button>
        <button className="btn" id="nav-instructorsfav" onClick={() => setActiveComponent('instructors')}>Instructors</button>
      </div>
      <div className="form-group user-info">
        {renderContent()}
      </div>
    </div>
  );
};
