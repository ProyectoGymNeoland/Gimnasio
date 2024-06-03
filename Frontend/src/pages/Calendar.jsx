import { useAuth } from "../context/authContext";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { BtnDay } from "../components/BtnDay";
import { getAllDays } from "../services/day.service";
import { useGetAllDaysError } from "../hooks/useGetAllDaysError";
import "./Calendar.css";

// Importamos la imagen desde Cloudinary
const calendarIconUrl = "https://res.cloudinary.com/dpw6wsken/image/upload/v1717357094/calendario_ansyz3.png";

export const Calendar = () => {
  const [days, setDays] = useState([]);
  const [res, setRes] = useState({});
  const [filteredDays, setFilteredDays] = useState([]);
  const { user } = useAuth();

  // Si el usuario no está logueado, redirige a la página de inicio de sesión
  if (!user) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    (async () => {
      setRes(await getAllDays());
    })();
  }, []);

  useEffect(() => {
    useGetAllDaysError(res, setRes, setDays);
  }, [res]);

  useEffect(() => {
    const today = new Date().toISOString();
    const filter = days.filter((day) => {
      const compareDate = day.dates >= today;
      return compareDate;
    });
    setFilteredDays(filter);
  }, [days]);

  return (
    <div className="calendar-page">
      <div className="calendar-header">
        <img src={calendarIconUrl} alt="Calendario Icono" className="calendar-icon" />
        <h1 className="calendar-title">CALENDARIO</h1>
      </div>
      <div className="calendar-container">
        {filteredDays.length > 0 ? (
          filteredDays.map((day) => (
            <BtnDay key={day._id} day={day} className="daybutton" />
          ))
        ) : (
          <p className="no-days-message">No hay días disponibles.</p>
        )}
      </div>
    </div>
  );
};
