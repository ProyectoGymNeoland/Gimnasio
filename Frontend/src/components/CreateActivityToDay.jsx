/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createActivityToDayService } from "../services/activityToDay.service";
import { useCreateActivityDayError, useGetActivity, useGetMonitor } from "../hooks";



export const CreateActivityDay = () => {
    const { register, handleSubmit } = useForm();
    const [res, setRes] = useState({});
    const [send, setSend] = useState(false);
    const [ok, setOk] = useState(false);
    const { activities, loading } = useGetActivity(); 
    const {monitors, reloading} = useGetMonitor(); 
     const roomOptions = ["sala verde", "sala roja","sala azul","sala amarilla","sala naranja","sala morada"];
    

    const formSubmit = async (formData) => {
        console.log("formData", formData);
        setSend(true);
        setRes(await createActivityToDayService(formData));
        setSend(false);
    };
    useEffect(() => {
        useCreateActivityDayError(res, setRes, setOk);
    console.log('res', res);
  }, [res]);
  if(ok){
    console.log("Creado con exito");


  }

  /**
   * CREAR UNA PAGINA QUE SE ENCARGUE DE METER UN MONITOR EN UNA ACTIVIDAD.
   * 
   */
    return (
        <>
            <div className="form-wrap">
                <h2>Crear clases</h2>
                <p>Formulario que crea las clases (activityId y monitorId)</p>
                <form onSubmit={handleSubmit(formSubmit)}>
                    <div className="monitor_container form-group">
                        <label htmlFor="monitor" className="custom-placeholder">Monitor:</label>
                        <select
                        id="monitor"
                        name="monitorId"
                        {...register('monitorId', { required: true })}>
                        <option value="">Seleccione un monitor</option>
                        {reloading ? (
                        <option value="" disabled>
                        Cargando...
                        </option>
                        ) : (monitors?.length !=0 &&
                        monitors.map((monitor) => (
                        <option key={monitor._id} value={monitor._id}>
                        {monitor.name}
                        </option>
                        ))
                        )}
                    </select>
                    </div>
                    <div className="actividad_container form-group">
                        <label htmlFor="actividad" className="custom-placeholder">Actividad</label>
                        <select
                        id="activity"
                        name="activityId"
                        {...register('activityId', { required: true })}>
                        <option value="">Seleccione una opción</option>
                        {loading ? (
                        <option value="" disabled>
                        Cargando...
                        </option>
                        ) : (activities?.length !=0 &&
                        activities.map((activity) => (
                        <option key={activity._id} value={activity._id}>
                        {activity.name}
                        </option>
                        ))
                        )}
                        </select>
                    </div>
                    <div className="room_container form-group">
                    <label htmlFor="costum-input" className="costum-placeholder">Sala:</label>
                    <select id="room" name="room" {...register('room', { required: false })}>
                        <option value="">Seleccione una sala</option>
                        {roomOptions.map((room) => (
                        <option key={room} value={room}>{room}</option>
                        ))}
                    </select>
                    </div>
                    <div className="btn_container">
                        <button type="submit" disabled={send} style={{ background: send ? "#49c1a388" : "#49c1a2" }}>
                            Enviar
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};