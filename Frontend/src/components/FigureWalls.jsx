import { useState } from "react";
import { useAuth } from "../context/authContext";
import { Link } from "react-router-dom";
import "./FigureWall.css"

export const FigureWalls = ({wall}) => {
   const { login, user } = useAuth();

  const [res, setRes] = useState({});


  const handleLike = async () => {
    //setRes(await (activity._id));
  };

  const handleLikeAnonymous = () => {
    Swal.fire({
      icon: 'info',
      title: 'Para guardar tus favoritos regístrate',
      html: `<a href="/login">Haz click aquí!</a>`,

      showConfirmButton: false,
      timer: 3000,
    });
  };
  

  
  return (
    <figure className="figure-container">
      <Link to={`/wall/${wall._id}`}>
        {wall.image && <img src={wall.image} alt={wall.name} width="200" />}
        <figcaption>
          <h2>{wall.name}</h2>
          <p>{wall.type}</p>
        </figcaption>
      </Link>
      {console.log(wall)}
      {/* {user && ( // Muestra el botón solo si el usuario está autenticado
        <button onClick={handleLike}>
          <span
            className={
              wall.likes.includes(user._id)
                ? 'material-symbols-outlined like'
                : 'material-symbols-outlined'
            }
          >
            favorite
          </span>
        </button>
      )}
      {!user && (
        <button onClick={handleLikeAnonymous}>
          <span className="material-symbols-outlined">favorite</span>
        </button>
      )} */}
    </figure>
  );
}
