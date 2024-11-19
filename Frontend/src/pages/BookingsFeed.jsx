import "./BookingsFeed.css"
import { useEffect, useState } from "react"
import { getAllBookings } from "../services/activityToDay.service"
import { useGetBookingError } from "../hooks"
import { useAuth } from "../context/authContext"

export const BookingsFeed=()=>{
    const [res,setRes]= useState(null)
    const [bookings,setBookings]=useState([])
    const [filteredBookings, setFilteredBookings] = useState([]);
    const {user}=useAuth()
    const userId = user ? user._id : null;

    const getUserBookings=async(id)=>{
        setRes(await getAllBookings(id))
    }

    useEffect(()=>{
        getUserBookings(userId)
    },[])

    useEffect(()=>{
        useGetBookingError(res,setRes,setBookings)
    },[res])  

    useEffect(()=>{
      const today = new Date().toISOString();
      const filter = bookings.filter(booking=>{
        const compareDate =booking.day.dates >= today;
        return compareDate;
      })
      setFilteredBookings(filter)
    },[bookings]);

    return(
        <div className="user-bookings">
        {console.log("reservas",bookings)}
         {console.log("filtro reservas dias:",filteredBookings)}
         <h3>Tus reservas:</h3>
        {filteredBookings.length>0 && filteredBookings.map((booked)=>{
            console.log("respuesta de bookings",booked)
            return(
                <div className="bookings">
                    <p id="booking_prg">- Clase de {booked?.activityId?.name} con {booked?.monitorId?.name} </p>
                    <p id="booking_prg">- Día:({new Date(booked?.day?.dates).toLocaleDateString()})</p>
                    <p id="booking_prg"> Consultar <a href={`/calendar/day/${booked.day._id}`}>horario</a>.</p>
                </div>
            )
        })}
       {bookings.length === 0 && 'No hay ninguna clase reservada'}
        </div>
    )
}