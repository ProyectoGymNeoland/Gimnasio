import { useEffect, useState } from "react";
import { getAllActivityToDay } from "../services/activityToDay.service";
import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const useGetActivityDay=()=>{
    const [activitiesDay,setActivitiesDay]=useState([]);
    const [loading,setLoading]=useState(false);
    const [res,setRes]=useState(null);
    
    const getActivitiesDay = async()=>{
        setLoading(true);
        setRes(await getAllActivityToDay());
        setLoading(false);
    }
    useEffect(()=>{
        console.log("Res.data",activitiesDay)
        res?.status == 200 &&
            setActivitiesDay(res.data)
        res?.status== 404 || res?.status == 500 &&         
            Swal.fire({
            icon: 'error',
            title: 'Actividad no encontrada',
            showConfirmButton: false,
            timer: 1500,
        })
        
   
        
    },[res,activitiesDay]);
    useEffect(()=>{
        getActivitiesDay();
    },[]);
    return {activitiesDay,loading};
}