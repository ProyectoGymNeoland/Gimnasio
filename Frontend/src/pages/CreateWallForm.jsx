import React, { useState } from "react";
import "./CreateWallForm.css"
export const CreateWallForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    type: "",
    expirationDate: "",
    owner: "",
    likes: [],
    image: [],
    activity: "",
    comments: [],
    days: [],
    content: "",
    name: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSubmit === 'function') {
      onSubmit(formData);
    } else {
      console.error("onSubmit is not a function");
    }
  };

  return (
    <>
        <div className="form-wrap main-container">
            <form className="create-wall-form" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Nombre" onChange={handleChange} required />
            <select name="type" onChange={handleChange} required>
                <option value="">Seleccione el tipo</option>
                <option value="Empresa">Empresa</option>
                <option value="usuarios">Usuarios</option>
                <option value="Publicidad">Publicidad</option>
            </select>
            <input type="date" name="expirationDate" onChange={handleChange} required />
            <input type="text" name="owner" placeholder="Propietario" onChange={handleChange} />
            <input type="text" name="image" placeholder="URL de la imagen" onChange={handleChange} />
            <textarea name="content" placeholder="Contenido" onChange={handleChange}></textarea>
            <button type="submit">Crear Muro</button>
            </form>
        </div>
    </>
  );
};