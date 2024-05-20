import { Link } from "react-router-dom";
import "./NavUser.css";
import { useAuth } from "../context/authContext";

export const NavUser = () => {
  
  return (
    <div className="containerNavUser">
        <div className="navUser">
        <Link to="/profile/mychats">
        <button className="button-navUser" id="nav-chat"> Chats
        <img
          src="https://res.cloudinary.com/dq186ej4c/image/upload/v1686125399/pngwing.com_npd5sa.png"
          alt="go to Chat"
          className="iconNav"
        />
        </button>
        
      </Link>

      <Link to="/profile/reviews">
      <button className="button-navUser" id="nav-review"> Reviews
       <img
          src="https://res.cloudinary.com/dq186ej4c/image/upload/v1686125391/Change_User_icon-icons.com_55946_lypx2c.png"
          alt="go to review"
          className="iconNav"
        />
        </button>
       
      </Link>

      <Link to="/profile/books">
      <button className="button-navUser" id="nav-books">Books
         <img
          src="https://res.cloudinary.com/dq186ej4c/image/upload/v1686125391/Change_User_icon-icons.com_55946_lypx2c.png"
          alt="go to books"
          className="iconNav"
        />
      </button>
       
      </Link>

      <Link to="/profile/activitiesfav"> 
      <button className="button-navUser" id="nav-activitiesfav"> Activies
           <img
          src="https://res.cloudinary.com/dq186ej4c/image/upload/v1686125391/Change_User_icon-icons.com_55946_lypx2c.png"
          alt="go to activities favorites"
          className="iconNav"
        />
      </button>
     
      </Link>
      </div>
      <div className="userInfo">
                AQUI SE PINTA LO QUE ENLACE CADA BOTON
      </div>

      

      {/* <img
        src="https://res.cloudinary.com/dq186ej4c/image/upload/v1686140226/eliminar_user_rmwoeg.png"
        alt="user delete button"
        className="iconNav iconDeleteUser"
        onClick={() => useDeleteUser(setUser, setDeleteUser)}
        // customhook que hace la peticion al servicio de delete User y setea el usuario a null en el contexto
      /> */}
    </div>
  );
};
