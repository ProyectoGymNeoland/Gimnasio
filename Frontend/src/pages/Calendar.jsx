import { useAuth } from "../context/authContext";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";


export const Calendar = () => {
    const { user } = useAuth();
    // Si el usuario no está logueado, redirige a la página de inicio de sesión
    if (!user) {
      return <Navigate to="/login" />;
    };

  return (
    <>
     <h1>ALGO</h1>
    </>
  );
};


