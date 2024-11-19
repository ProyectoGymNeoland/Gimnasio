import { useEffect, useState } from "react"
import { getByRolUser } from "../services/user.service";
import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const useGetMonitor=()=>{
    const [monitors,setMonitors]=useState([]);
    const [reloading,setReloading]=useState(false);
    const [res,setRes]=useState(null);

    const getMonitors = async (rol)=>{
        setReloading(true);
        setRes(await getByRolUser(rol));
        setReloading(false);
    }
        useEffect(()=>{
  
        res?.status == 200 &&
            setMonitors(res.data)
        res?.status== 404 || res?.status == 500 &&         
            Swal.fire({
            icon: 'error',
            title: 'Monitor no encontrado',
            showConfirmButton: false,
            timer: 1500,
        })
        
   
        
    },[res]);
    useEffect(()=>{
       getMonitors("monitor");
    },[]);
    return {monitors,reloading};
}