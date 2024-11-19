import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { UserProfileCard } from '../components/UserProfileCard';
import { NavUser } from '../components/NavUser';
import './Profile.css';

export const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="profile-container">
      <div className="left-panel">
        <UserProfileCard user={user} />
      </div>
      <div className="right-panel">
        <NavUser />
      </div>
    </div>
  );
};

