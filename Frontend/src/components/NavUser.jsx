import { Link } from "react-router-dom";
import "./NavUser.css";
import "../pages/Register"


export const NavUser = () => {
  
  return (
    <div className="form-wrap">
        <div className="form-group user-nav">
            <Link to="/profile/mychats">
                <button className="btn" id="nav-chat"> Chats
                </button>
            </Link>

            <Link to="/profile/reviews">
                <button className="btn" id="nav-review"> Reviews
                </button>
            </Link>

            <Link to="/profile/reviews">
                <button className="btn" id="nav-likesWall"> Likes
                </button>
            </Link>

            <Link to="/profile/books">
                <button className="btn" id="nav-books">Books
                </button>
            </Link>

            <Link to="/profile/activitiesfav"> 
                <button className="btn" id="nav-activitiesfav"> Activies
                </button>
            </Link>

            <Link to="/profile/activitiesfav"> 
                <button className="btn" id="nav-instructorsfav">Instructors
                </button>
            </Link>
        </div>
        <div className="form-group user-info">
                AQUI SE PINTA LO QUE ENLACE CADA BOTON
        </div>
    </div>
  );
};
