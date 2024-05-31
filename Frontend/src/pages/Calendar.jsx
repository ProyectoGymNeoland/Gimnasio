import { useAuth } from "../context/authContext";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { BtnDay } from "../components/BtnDay"
import { getAllDays } from "../services/day.service";
import { useGetAllDaysError } from "../hooks/useGetAllDaysError";


export const Calendar = () => {
    const [days, setDays] = useState([]);
    const [res, setRes] = useState({});
    const [filteredDays, setFilteredDays] = useState([]);
    const { user } = useAuth();

    // Si el usuario no está logueado, redirige a la página de inicio de sesión
    if (!user) {
      return <Navigate to="/login" />;
    };

    useEffect(() => {
    (async () => {
      setRes(await getAllDays());
    })();
    }, []);

    useEffect(() => {
      useGetAllDaysError(res, setRes, setDays);
    }, [res])

    useEffect(()=>{
      const today = new Date().toISOString();
      const filter = days.filter(day=>{
        const compareDate = day.dates >= today;
        return compareDate;
      })
      setFilteredDays(filter)
    },[days]);

    return(
        <>
        <h1>ESTA ES LA PAGINA DE CALENDARIO</h1>
        
        <div id="containerDays">
            {filteredDays.length>0 && filteredDays.map((day)=>{
            return(
            <BtnDay
            key={day._id}
            day={day}
            className={day.day}
            />
            );
            })}
            {days.length === 0 && 'No se han encontrado dias'}   
        </div>
        
        </>
    )
};


