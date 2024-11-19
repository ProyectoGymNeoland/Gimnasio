import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

export const ProtectedCheckChildren = ({ children }) => {
  const { allUser, user } = useAuth();
  /**
   * aqui me traigo el allUser para los usuarios que vienen del register
   * aqui me traigo el user para los usuarios que viene de login
   */
  if (allUser?.data?.user?.check == true || user?.check == true) {
    return <Navigate to="/profile" />;
  }
  if (user == null && allUser.data.confirmationCode === "") {
    return <Navigate to="/login" />;
  }
  return children;
};
