/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { bookingActivityToDay } from "../services/activityToDay.service";
import { useAuth } from "../context/authContext";
import { useErrorBooking } from "../hooks";
import './CardReserva.css';

export const CardReserva = ({info}) => {
    const {user}=useAuth()
    const [res,setRes]= useState(null)
    const [ableButton,setAbleButton]=useState(false)
    const [bookingStatus, setBookingStatus] = useState(info?.bookings.includes(user?._id))
    const [bookingSpots, setBookingSpots] = useState(info?.activityId?.spots - info?.bookings.length);

    const handleBooking =()=>{
        (async()=>{
            setRes(await bookingActivityToDay(info._id))
            bookingStatus?setBookingSpots(acc=>acc+1):setBookingSpots(acc=>acc-1)
             setBookingStatus(!bookingStatus)
        })()

    }
   
    useEffect(() => {

        useErrorBooking(res, setRes)

    
    }, [res])

    useEffect(() => {
        bookingSpots === 0 ? setAbleButton(true): ableButton
    
    }, [bookingSpots]);
    
  return (
    <figure className="reservation-card">
        <img src={info?.activityId?.image} alt={info?.activityId?.name} />
        <p>Monitor: {info?.monitorId?.name}</p>
        <p>Actividad: {info?.activityId?.name}</p>
        <p>Plazas disponibles: {bookingSpots}</p>
        <p>Sala: {info?.room}</p>
        <button onClick={() => handleBooking()} disabled={ableButton}style={{ backgroundColor: bookingStatus ? "#FF3333" : "#49c1a2" }}>{bookingStatus ? "Cancelar reserva" : "Reservar"}</button>
    </figure>
  )
}
