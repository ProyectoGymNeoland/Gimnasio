import './FormActivity.css';
import { useEffect, useState } from 'react';
import { useGetActivity, useGetMonitor } from '../hooks';

export const FormActivity = ({tramo, setDataTramo}) => {
  
  const { activities, loading } = useGetActivity();
  const { monitors, reloading } = useGetMonitor();
  const [tramoOk, setTramoOk]= useState({
    
        room: null,
        activityId:null,
        monitorId: null
    

  })
  const roomOptions = [
    'sala verde',
    'sala roja',
    'sala azul',
    'sala amarilla',
    'sala naranja',
    'sala morada',
  ];

  useEffect(() => {
    console.log("tramoOk", tramoOk)
    if (tramoOk.room != null && tramoOk.activityId != null && tramoOk.monitorId != null){
        setDataTramo((value)=> ({...value, [tramo]: tramoOk }))
    }
    
  }, [tramoOk])
  

  return (
    <>
      <div id="tramos">
        <h3>{tramo}</h3>
        <div className="monitor_container form-group">
            <label htmlFor="monitor" className="custom-placeholder">
              Monitor:
            </label>
            <select
              id="monitor"
              name="monitorId"
              required
              onInput={(e)=> setTramoOk((value)=>({...value,monitorId: e.target.value})

              )}
              
            >
              <option value="">Seleccione un monitor</option>
              {reloading ? (
                <option value="" disabled>
                  Cargando...
                </option>
              ) : (
                monitors?.length != 0 &&
                monitors.map((monitor) => (
                  <option key={monitor._id} value={monitor._id}>
                    {monitor.name}
                  </option>
                ))
              )}
            </select>
          </div>
          <div className="actividad_container form-group">
            <label htmlFor="actividad" className="custom-placeholder">
              Actividad
            </label>
            <select
              id="activity"
              name="activityId"
              required
              onInput={(e)=> setTramoOk((value)=>({...value,activityId: e.target.value}))}>
              <option value="">Seleccione una opción</option>
              {loading ? (
                <option value="" disabled>
                  Cargando...
                </option>
              ) : (
                activities?.length != 0 &&
                activities.map((activity) => (
                  <option key={activity._id} value={activity._id}>
                    {activity.name}
                  </option>
                ))
              )}
            </select>
          </div>
          <div className="room_container form-group">
            <label htmlFor="costum-input" className="costum-placeholder">
              Sala:
            </label>
            <select id="room" name="room"  required
              onInput={(e)=> setTramoOk((value)=>({...value,room: e.target.value}))}>
              <option value="">Seleccione una sala</option>
              {roomOptions.map((room) => (
                <option key={room} value={room}>
                  {room}
                </option>
              ))}
            </select>

          </div>
        

      </div>
        
         
         
    </>
  );
};
