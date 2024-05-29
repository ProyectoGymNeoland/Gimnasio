import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './NavUser.css';
import { ChatDetail } from './ChatDetail';
import { ActivitiesFeed } from '../pages';
import { UserReviews } from './UserReviews';

export const NavUser = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeComponent, setActiveComponent] = useState(null);

    // Detect if we are in chat detail view
    const isChatDetail = location.pathname.includes('/profile/chat/detail/');

    const renderContent = () => {
        if (isChatDetail) {
            return <ChatDetail />;
        }

        switch (activeComponent) {
          case 'activities':
            return <ActivitiesFeed />;
          case 'reviews':
            return <UserReviews />;
          case 'books':
            return <div>Books Content</div>; // Puedes reemplazar esto con el componente correspondiente
          case 'instructors':
            return <div>Instructors Content</div>;
          default:
            return <div>Selecciona una opción</div>;
        }
    };

    const handleNavigate = (path, component) => {
        setActiveComponent(component);
        navigate(path);
    };

    return (
      <div className="form-wrap">
        <nav className="form-group user-nav">
          <button onClick={() => handleNavigate('/profile', null)}>Perfil</button>
          <button onClick={() => handleNavigate('/profile/chat', 'chat')}>Chats</button>
          <button onClick={() => handleNavigate('/profile/reviews', 'reviews')}>
            Reviews
          </button>
          <button
            className="btn"
            id="nav-books"
            onClick={() => handleNavigate('/profile/books', 'books')}
          >
            Books
          </button>
          <button
            className="btn"
            id="nav-activitiesfav"
            onClick={() => handleNavigate('/profile/activities', 'activities')}
          >
            Activities
          </button>
          <button
            className="btn"
            id="nav-instructorsfav"
            onClick={() => handleNavigate('/profile/instructors', 'instructors')}
          >
            Instructors
          </button>
        </nav>
        <div className="form-group user-info">
          {!isChatDetail && renderContent()}
          {isChatDetail && <ChatDetail />}
        </div>
      </div>
    );
};
