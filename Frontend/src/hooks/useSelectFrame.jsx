import { useState } from "react";
import { useGetActivityDay } from "./useGetActivityDay";

export const useSelectFrame = (register)=>{
    const [selectedType,setSelectedType]=useState("");
    const {activitiesDay,loading}=useGetActivityDay();
    const handleType= (event)=>{
        setSelectedType(event.target.value);
    }

    

    const renderHabil=()=>{
        return(
        <>
        <label htmlFor="actividad" className="custom-placeholder">9:00-9:45 :</label>
        {console.log("Entro en habil")}
                        <select
                        id="one"
                        name="one"
                        {...register('one')}>
                        <option value="">Seleccione la clase</option>
                        {loading ? (
                        <option value="" disabled>
                        Cargando...
                        </option>
                        ) : (activitiesDay?.length !=0 &&
                        activitiesDay.map((activityDay) => (
                        
                         <option key={activityDay?._id} value={activityDay?._id}>
                         {` ${activityDay?.activityId?.name} - ${activityDay?.monitorId?.name}`}
                         </option>
                        
                        ))
                        )}
                        </select>
                        <label htmlFor="actividad" className="custom-placeholder">10:00-10:45 :</label>
                        <select
                        id="two"
                        name="two"
                        {...register('two')}>
                        <option value="">Seleccione la clase</option>
                        {loading ? (
                        <option value="" disabled>
                        Cargando...
                        </option>
                        ) : (activitiesDay?.length !=0 &&
                        activitiesDay.map((activityDay) => (
                        
                         <option key={activityDay?._id} value={activityDay?._id}>
                         {` ${activityDay?.activityId?.name} - ${activityDay?.monitorId?.name}`}
                         </option>
                        
                        ))
                        )}
                        </select>
                        <label htmlFor="actividad" className="custom-placeholder">11:00-11:45 :</label>
                        <select
                        id="three"
                        name="three"
                        {...register('three')}>
                        <option value="">Seleccione la clase</option>
                        {loading ? (
                        <option value="" disabled>
                        Cargando...
                        </option>
                        ) : (activitiesDay?.length !=0 &&
                        activitiesDay.map((activityDay) => (
                        
                         <option key={activityDay?._id} value={activityDay?._id}>
                         {` ${activityDay?.activityId?.name} - ${activityDay?.monitorId?.name}`}
                         </option>
                        
                        ))
                        )}
                        </select>
                        <label htmlFor="actividad" className="custom-placeholder">12:00-12:45 :</label>
                        <select
                        id="four"
                        name="four"
                        {...register('four')}>
                        <option value="">Seleccione la clase</option>
                        {loading ? (
                        <option value="" disabled>
                        Cargando...
                        </option>
                        ) : (activitiesDay?.length !=0 &&
                        activitiesDay.map((activityDay) => (
                        
                         <option key={activityDay?._id} value={activityDay?._id}>
                         {` ${activityDay?.activityId?.name} - ${activityDay?.monitorId?.name}`}
                         </option>
                        
                        ))
                        )}
                        </select>
                        <label htmlFor="actividad" className="custom-placeholder">17:00-17:45 :</label>
                        <select
                        id="five"
                        name="five"
                        {...register('five')}>
                        <option value="">Seleccione la clase</option>
                        {loading ? (
                        <option value="" disabled>
                        Cargando...
                        </option>
                        ) : (activitiesDay?.length !=0 &&
                        activitiesDay.map((activityDay) => (
                        
                         <option key={activityDay?._id} value={activityDay?._id}>
                         {` ${activityDay?.activityId?.name} - ${activityDay?.monitorId?.name}`}
                         </option>
                        
                        ))
                        )}
                        </select>
                        <label htmlFor="actividad" className="custom-placeholder">18:00-18:45 :</label>
                        <select
                        id="six"
                        name="six"
                        {...register('six')}>
                        <option value="">Seleccione la clase</option>
                        {loading ? (
                        <option value="" disabled>
                        Cargando...
                        </option>
                        ) : (activitiesDay?.length !=0 &&
                        activitiesDay.map((activityDay) => (
                        
                         <option key={activityDay?._id} value={activityDay?._id}>
                         {` ${activityDay?.activityId?.name} - ${activityDay?.monitorId?.name}`}
                         </option>
                        
                        ))
                        )}
                        </select>
                        <label htmlFor="actividad" className="custom-placeholder">19:00-19:45 :</label>
                        <select
                        id="seven"
                        name="seven"
                        {...register('seven')}>
                        <option value="">Seleccione la clase</option>
                        {loading ? (
                        <option value="" disabled>
                        Cargando...
                        </option>
                        ) : (activitiesDay?.length !=0 &&
                        activitiesDay.map((activityDay) => (
                        
                         <option key={activityDay?._id} value={activityDay?._id}>
                         {` ${activityDay?.activityId?.name} - ${activityDay?.monitorId?.name}`}
                         </option>
                        
                        ))
                        )}
                        </select>
                        <label htmlFor="actividad" className="custom-placeholder">20:00-20:45 :</label>
                        <select
                        id="eight"
                        name="eight"
                        {...register('eight')}>
                        <option value="">Seleccione la clase</option>
                        {loading ? (
                        <option value="" disabled>
                        Cargando...
                        </option>
                        ) : (activitiesDay?.length !=0 &&
                        activitiesDay.map((activityDay) => (
                        
                         <option key={activityDay?._id} value={activityDay?._id}>
                         {` ${activityDay?.activityId?.name} - ${activityDay?.monitorId?.name}`}
                         </option>
                        
                        ))
                        )}
                        </select>
        </>
        );
    }
    const renderFinde=() => {
        return(
        <>
        <label htmlFor="actividad" className="custom-placeholder">10:00-10:45 :</label>
        {console.log("Entro en finde")}
                        <select
                        id="one"
                        name="one"
                        {...register('one')}>
                        <option value="">Seleccione la clase</option>
                        {loading ? (
                        <option value="" disabled>
                        Cargando...
                        </option>
                        ) : (activitiesDay?.length !=0 &&
                        activitiesDay.map((activityDay) => (
                        
                         <option key={activityDay._id} value={activityDay._id}>
                         {` ${activityDay.activityId.name} - ${activityDay.monitorId?.name}`}
                         </option>
                        
                        ))
                        )}
                        </select>
                        <label htmlFor="actividad" className="custom-placeholder">11:00-11:45 :</label>
                        <select
                        id="two"
                        name="two"
                        {...register('two')}>
                        <option value="">Seleccione la clase</option>
                        {loading ? (
                        <option value="" disabled>
                        Cargando...
                        </option>
                        ) : (activitiesDay?.length !=0 &&
                        activitiesDay.map((activityDay) => (
                        
                         <option key={activityDay._id} value={activityDay._id}>
                         {` ${activityDay.activityId.name} - ${activityDay.monitorId?.name}`}
                         </option>
                        
                        ))
                        )}
                        </select>
                        <label htmlFor="actividad" className="custom-placeholder">12:00-12:45 :</label>
                        <select
                        id="three"
                        name="three"
                        {...register('three')}>
                        <option value="">Seleccione la clase</option>
                        {loading ? (
                        <option value="" disabled>
                        Cargando...
                        </option>
                        ) : (activitiesDay?.length !=0 &&
                        activitiesDay.map((activityDay) => (
                        
                         <option key={activityDay._id} value={activityDay._id}>
                         {` ${activityDay.activityId.name} - ${activityDay.monitorId?.name}`}
                         </option>
                        
                        ))
                        )}
                        </select>
        </>
        );
    }
    const renderFestivo=()=>{
        return(
        <>
        <label htmlFor="actividad" className="custom-placeholder">9:00-9:45 :</label>
        {console.log("Entro en festivo")}
                        <select
                        id="one"
                        name="one"
                        {...register('one')}>
                        <option value="">Seleccione la clase</option>
                        {loading ? (
                        <option value="" disabled>
                        Cargando...
                        </option>
                        ) : (activitiesDay?.length !=0 &&
                        activitiesDay.map((activityDay) => (
                        
                         <option key={activityDay._id} value={activityDay._id}>
                         {` ${activityDay.activityId.name} - ${activityDay.monitorId?.name}`}
                         </option>
                        
                        ))
                        )}
                        </select>
                        <label htmlFor="actividad" className="custom-placeholder">10:00-10:45 :</label>
                        <select
                        id="two"
                        name="two"
                        {...register('two')}>
                        <option value="">Seleccione la clase</option>
                        {loading ? (
                        <option value="" disabled>
                        Cargando...
                        </option>
                        ) : (activitiesDay?.length !=0 &&
                        activitiesDay.map((activityDay) => (
                        
                         <option key={activityDay._id} value={activityDay._id}>
                         {` ${activityDay.activityId.name} - ${activityDay.monitorId?.name}`}
                         </option>
                        
                        ))
                        )}
                        </select>
                        <label htmlFor="actividad" className="custom-placeholder">11:00-11:45 :</label>
                        <select
                        id="three"
                        name="three"
                        {...register('three')}>
                        <option value="">Seleccione la clase</option>
                        {loading ? (
                        <option value="" disabled>
                        Cargando...
                        </option>
                        ) : (activitiesDay?.length !=0 &&
                        activitiesDay.map((activityDay) => (
                        
                         <option key={activityDay._id} value={activityDay._id}>
                         {` ${activityDay.activityId.name} - ${activityDay.monitorId?.name}`}
                         </option>
                        
                        ))
                        )}
                        </select>
                        <label htmlFor="actividad" className="custom-placeholder">12:00-12:45 :</label>
                        <select
                        id="four"
                        name="four"
                        {...register('four')}>
                        <option value="">Seleccione la clase</option>
                        {loading ? (
                        <option value="" disabled>
                        Cargando...
                        </option>
                        ) : (activitiesDay?.length !=0 &&
                        activitiesDay.map((activityDay) => (
                        
                         <option key={activityDay._id} value={activityDay._id}>
                         {` ${activityDay.activityId.name} - ${activityDay.monitorId?.name}`}
                         </option>
                        
                        ))
                        )}
                        </select>
                        <label htmlFor="actividad" className="custom-placeholder">13:00-13:45 :</label>
                        <select
                        id="five"
                        name="five"
                        {...register('five')}>
                        <option value="">Seleccione la clase</option>
                        {loading ? (
                        <option value="" disabled>
                        Cargando...
                        </option>
                        ) : (activitiesDay?.length !=0 &&
                        activitiesDay.map((activityDay) => (
                        
                         <option key={activityDay._id} value={activityDay._id}>
                         {` ${activityDay.activityId?.name} - ${activityDay.monitorId?.name}`}
                         </option>
                        
                        ))
                        )}
                        </select>
        </>
        );
    }
    return {selectedType,handleType,renderHabil,renderFestivo,renderFinde}
    
}

