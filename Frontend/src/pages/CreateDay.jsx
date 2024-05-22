import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { createDayService } from "../services/day.service";
import { useAuth } from "../context/authContext";
import "./CreateDay.css";

export const CreateDay = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [ok, setOk] = useState(false);

  const { register, handleSubmit } = useForm();

  const formSubmit = async (formData) => {
    setSend(true);
    setRes(await createDayService(formData));
    setSend(false);
  };

  useEffect(() => {
    if (res.status === 200) {
      setOk(true);
    } else {
      // aquí se muestra el error 
    }
  }, [res]);

  if (ok) {
    return <Navigate to="/days" />;
  }

  return (
    <div className="form-wrap">
      <h1>Crear Día</h1>
      <p>Registra un nuevo día</p>
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className="form-group">
          <label htmlFor="day">Día</label>
          <input
            type="text"
            id="day"
            name="day"
            {...register('day', { required: true })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="room">Sala</label>
          <input
            type="text"
            id="room"
            name="room"
            {...register('room', { required: true })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="dates">Fechas</label>
          <input
            type="date"
            id="dates"
            name="dates"
            {...register('dates', { required: true })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Tipo de Día</label>
          <select id="type" name="type" {...register('type', { required: true })}>
            <option value="Habil">Hábil</option>
            <option value="Finde">Fin de Semana</option>
            <option value="Festivo">Festivo</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="activities">Actividades</label>
          <input
            type="text"
            id="activities"
            name="activities"
            {...register('activities', { required: false })}
          />
        </div>

        <div className="btn_container">
          <button
            className="btn"
            type="submit"
            disabled={send}
            style={{ background: send ? '#49c1a388' : '#2f7a67' }}
          >
            Crear
          </button>
        </div>
      </form>
    </div>
  );
};
