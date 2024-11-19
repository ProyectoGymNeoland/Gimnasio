import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './CrearActivity.css';
import { Uploadfile } from '../components/Uploadfile';
import { useUpdateActivityError } from '../hooks/useUpdateActivityError';
import { Navigate, useParams } from 'react-router-dom';
import { getById, updateActivity } from '../services/activities.service';
import { useAuth } from '../context/authContext';

export const UpdateActivity = () => {
  const { user } = useAuth();
  const { id } = useParams();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [ok, setOk] = useState(false);
  const [activity, setActivity] = useState(null);

  const { register, handleSubmit, setValue, getValues } = useForm(); // de use form me estoy haciendo un destructurin y me traigo el register ...

  useEffect(() => {
    const fetchActivity = async () => {
      const res = await getById(id);
      setActivity(res.data);
      setValue('name', res.data.name);
      setValue('spots', res.data.spots);
      setValue('description', res.data.description);
      setValue('type', res.data.type);
      setValue('status', res.data.status);
      setValue('image', res.data.image);
    };

    fetchActivity();
  }, [id, setValue]);

  const formSubmit = async (formData) => {
    const inputFile = document.getElementById('file-upload').files;
    const customFormData = new FormData();

    for (let key in formData) {
      customFormData.append(key, formData[key]);
    }

    if (inputFile.length !== 0) {
      customFormData.append('image', inputFile[0]);
    }

    setSend(true);
    setRes(await updateActivity(id, customFormData));
    setSend(false);
  };

  useEffect(() => {
    useUpdateActivityError(res, setRes, setOk);
  }, [res]);

  if (ok) {
    return <Navigate to="/activities/feed" />;
  }

  if (!activity) return <p>Loading...</p>;
  return (
    <div className="form-wrap">
      <h1>Actualizar actividad Energy Center</h1>
      <p>Edita los detalles de la actividad deportiva</p>
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className="user_container form-group">
          <label htmlFor="custom-input" className="custom-placeholder">
            Nombre de la actividad
          </label>
          <input
            className="input_activity"
            type="text"
            id="name"
            name="name"
            autoComplete="false"
            {...register('name', { required: true })}
          />
        </div>

        <div className="spotscontainer form-group">
          <label htmlFor="custom-input" className="custom-placeholder">
            Número de plazas
          </label>
          <input
            className="input_activity"
            type="number"
            id="number"
            name="spots"
            autoComplete="false"
            {...register('spots', { required: true })}
          />
        </div>

        <div className="descriptioncontainer form-group">
          <label htmlFor="custom-input" className="custom-placeholder">
            Descripción de la actividad
          </label>
          <textarea
            className="input_activity"
            id="description"
            name="description"
            autoComplete="false"
            {...register('description', { required: true })}
          ></textarea>
        </div>

        <div className="type form-group">
          <label htmlFor="custom-input" className="custom-placeholder">
            Tipo de actividad
          </label>
          <input
            type="radio"
            name="type"
            id="colectivas"
            value="colectivas"
            {...register('type')}
          />
          <label htmlFor="colectivas" className="label-radio colectivas">
            Colectivas
          </label>
          <input
            type="radio"
            name="type"
            id="pistas"
            value="pistas"
            {...register('type')}
          />
          <label htmlFor="pistas" className="label-radio pistas">
            Pistas
          </label>
        </div>
        <div className="status form-group">
          <label htmlFor="custom-input" className="custom-placeholder">
            Estado
          </label>
          <input
            type="radio"
            name="status"
            id="activo"
            value="true"
            {...register('status')}
            defaultChecked={activity.status === true}
            className={`label-radio status ${activity.status ? 'active' : ''}`} // Agrega la clase 'active' si el estado es activo
          />
          <label
            htmlFor="activo"
            className={`label-radio status ${activity.status ? 'active' : ''}`}
          >
            Activo
          </label>
          <input
            type="radio"
            name="status"
            id="inactivo"
            value="false"
            {...register('status')}
            defaultChecked={activity.status === false}
            className={`label-radio status ${!activity.status ? 'active' : ''}`} // Agrega la clase 'active' si el estado es inactivo
          />
          <label
            htmlFor="inactivo"
            className={`label-radio status ${!activity.status ? 'active' : ''}`}
          >
            Desactivado
          </label>
        </div>
        <Uploadfile img={getValues('image')} />
        <div className="btn_container">
          <button
            className="btn"
            type="submit"
            disabled={send}
            style={{ background: send ? '#49c1a388' : '#2f7a67' }}
          >
            Actualizar
          </button>
        </div>
      </form>
    </div>
  );
};
