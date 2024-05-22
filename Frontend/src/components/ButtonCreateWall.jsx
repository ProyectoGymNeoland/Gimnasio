import { useState } from "react"
import "./ButtonCreateWall.css"
import { CreateWallForm } from "../pages/CreateWallForm";
import { useNavigate } from "react-router-dom";

export const ButtonCreateWall = ({ onCreateWall }) => {

  const [showForm, setShowForm] = useState(false);

  const handleFormSubmit = (wallData) => {
    onCreateWall(wallData);
    setShowForm(false);
  };


const navigate = useNavigate()

const handleButtonClick = ()=>{
  navigate("/createWallForm")
}


  return (
    <div className="contenedor-boton-formulario">
    <button className="boton-formulario" onClick={ handleButtonClick }>Crear Muro</button>
    {showForm && <CreateWallForm onSubmit={onCreateWall} />}
    </div>
  )
}
