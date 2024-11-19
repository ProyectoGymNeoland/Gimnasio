import { useEffect, useState } from "react"
import { getAllActivities } from "../services/activities.service";
import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const useGetActivity=()=>{
    const [activities,setActivities]=useState([]);
    const [loading,setLoading]=useState(false);
    const [res,setRes]=useState(null);
    
    const getActivities = async()=>{
        setLoading(true);
        setRes(await getAllActivities());
        setLoading(false);
    }
    useEffect(()=>{
        res?.status == 200 &&
            setActivities(res.data)
        res?.status== 404 || res?.status == 500 &&         
            Swal.fire({
            icon: 'error',
            title: 'Actividad no encontrada',
            showConfirmButton: false,
            timer: 1500,
        })
        
   
        
    },[res]);
    useEffect(()=>{
        getActivities();
    },[]);
    return {activities,loading};
}