import React, { useEffect, useState } from "react";
import "./CreateWallForm.css"
import "./CrearActivity.css";
import { useForm } from 'react-hook-form';
import { useCreateWallError } from "../hooks/useCreateWallError";
import { Uploadfile } from "../components";
import { createWall } from "../services/wall.service";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";

export const CreateWallForm = () => {
  
      const { user } = useAuth();
  // Si el usuario no está logueado, redirige a la página de inicio de sesión
  if (!user) {
    return <Navigate to="/login" />;
  }

    //! 1) crear los estados
    const [ res, setRes ] = useState({});
    const [ send, setSend ] = useState(false);
    const [ ok, setOk ] = useState(false);
 
    //! 2) llamada al hook de react hook form
    const { register, handleSubmit } = useForm();

    //! 3) la funcion que gestiona los datos del formulario
    const formSubmit = async (formData) => {
      console.log(formData)
        const inputFile = document.getElementById("file-upload").files;

        //* condicional para enviar los datos del formulario al backend tanto si hay subida imagen como si no
        if (inputFile.length != 0) {
            // si es diferente a 0 es que hay algo dentro de files
            const customFormData = {
                ...formData,
                image: inputFile[0],
                owner: user._id,
            }
            //llamada al backend
            setSend(true);
            setRes(await createWall(customFormData));
            setSend(false);
        } else {
            // si no hay imagen solo hago una copia del formData
            const customFormData = {
                ...formData,
                owner: user._id,
            }
            //llamada al backend
            setSend(true);
            setRes(await createWall(customFormData));
            setSend(false);
        }
    }

//! 4) useEffects que gestionan la repuesta y manejan los errores
useEffect(() => {
    useCreateWallError(res, setRes, setOk);
}, [res])


 //! 5) estados de navegacion
 if (ok) {
    return <Navigate to="/wall"/>
}

  return (
    <>
        <div className="form-wrap main-container">
            <form className="create-wall-form" onSubmit={handleSubmit(formSubmit)}>
            <div className="user_container form-group">
            <input className="input_user" type="text" name="name" placeholder="Nombre"  {...register("name", { required: true })} />
            </div>
            <select className="user_container form-group" name="type" {...register('type', { required: true })}>
                <option value="">Seleccione el tipo</option>
                <option value="Empresa">Empresa</option>
                <option value="usuarios">Usuarios</option>
                <option value="Publicidad">Publicidad</option>
            </select>
            <div className="user_container form-group">
            <input type="date" name="expirationDate"  {...register("expirationDate", { required: true })} />
            </div>
            <div className="user_container form-group">
            </div>
            <Uploadfile />
            <div className="user_container form-group">
            <textarea className="user_container form-group" name="content" placeholder="Contenido"  {...register("content", { required: true })}></textarea>
            </div>
            <button
              className="btn"
              type="submit"
              disabled={send}
              style={{ background: send ? '#49c1a388' : '#2f7a67' }}
            >
              Crear
            </button>
            </form>
        </div>
    </>
  );
};