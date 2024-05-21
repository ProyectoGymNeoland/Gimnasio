// src/components/UserProfile.jsx
import React, { useState } from 'react';
import { deleteUser } from '../services/user.service';
import './UserProfileCard.css';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';

export const UserProfileCard = ({ user }) => {
  console.log('hola', user);
  //   if (!user) {
  //     return <div>Lorem ipsum...</div>;
  //   }
  const [showEditForm, setShowEditForm] = useState(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);

  const handleDelete = async () => {
    Swal.fire({
      title: '¿Seguro que quieres eliminar tu perfil?',
      text: '¡Esta acción no se puede desahacer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, quiero borrar mi perfil',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deleteUser(user._id);
        if (response?.status === 200) {
          Swal.fire('¡Borrado!', 'Tu perfil ha sido eliminado', 'success');
          // Redirigir o cerrar sesión después de eliminar el perfil
        } else {
          Swal.fire('Error!', 'Ha habido un problema al borrar tu usuario.', 'error');
        }
      }
    });
  };

  const handleLogout = () => {
    const { logout } = useAuth();
    logout();
  };

  return (
    <div className="user-profile">
      <img src={user?.image} alt={user?.name} />
      <h1>{user?.name}</h1>
      <p>Edad: {user?.age}</p>
      <p>Género: {user?.gender}</p>
      <Link to="/update/update">
        <button>Editar Perfil</button>
      </Link>
      <Link to="/changePassword">
        <button>Cambiar Contraseña</button>
      </Link>
      <button onClick={handleDelete}>Eliminar Perfil</button>
      <button onClick={handleLogout}>LogoutIcono</button>
    </div>
  );
};
