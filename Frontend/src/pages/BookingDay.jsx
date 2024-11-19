import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { getDayId } from "../services/day.service";
import { useGetDayError } from "../hooks";
import { DayDetails } from "../components";
/*import './BookingDay.css';*/

export const BookingDay=()=>{
    const { idDay } = useParams(); 
    const [day, setDay] = useState(null);
    const [res, setRes] = useState({});

    useEffect(() => {
    (async () => {
      setRes(await getDayId(idDay));
    })();
  }, [idDay]);

    useEffect(() => {
    /** le pasamos la info del dia cuando hay un 200 
     */
    useGetDayError(res, setRes, setDay);
  }, [res]);

    return (<>
      {console.log("La info para gestionar toda la pagina",day)}
      {
        day != null &&   <DayDetails day={day}/>
      }</>
      
        
    )
}