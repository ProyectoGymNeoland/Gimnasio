import { useAuth } from "../context/authContext";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { BtnDay } from "../components/BtnDay"
import { getAllDays } from "../services/day.service";
import { useGetAllDaysError } from "../hooks/useGetAllDaysError";


export const Calendar = () => {
    const [days, setDays] = useState([]);
    const [res, setRes] = useState({});
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

    useEffect(() => {
        console.log("que es res y como lo coge",res);
    }, [days,res]);
    return(
        <>
        <h1>ESTA ES LA PAGINA DE CALENDARIO</h1>
        {console.log("que es days",days)}
        
        <div id="containerDays">
            {days.length>0 && days.map((day)=>(
            <BtnDay
            key={day._id}
            day={day}
            className={day.day}
            />
            )
            )}
            {days.length === 0 && 'No se han encontrado dias'}
            
        </div>
        
        </>
    )
};


