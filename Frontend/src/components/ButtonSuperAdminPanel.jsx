import { Link } from "react-router-dom";
import "./ButtonSuperAdminPanel.css";

export const ButtonSuperAdminPanel = ({ to, children }) => {
  return (
    <Link to={to} className="card-button">
      <button className="custom-button">{children}</button>
    </Link>
  );
};
