import './CreateNewDay.css';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateNewDayError } from '../hooks';
import { FormActivity } from '../components';
import { createUltimateDay } from '../services/activityToDay.service';

export const CreateNewDay = () => {
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [ok, setOk] = useState(false);
  const [tramosOk, setTramosOk] = useState(null);
  const [dataTramo,setDataTramo] = useState({})
  const typeOptions = ['Habil', 'Finde', 'Festivo'];
  const dayOptionns = [
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
    'Domingo',
  ];
  const tramos = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];

  const handleType = (e) => {
    console.log("🚀 ~ handleType ~ e.target.value:", e.target.value)
    
    switch (e.target.value) {
      case 'Habil':
        setTramosOk(8)
        break;
      case'Finde':
      setTramosOk(3)
        break;
      case 'Festivo':
        setTramosOk(5)
        break;

      default:
        break;
    }
  };

  const formSubmit = async (formData) => {
    const customFormData = {
        ...formData,
        infoTramos: dataTramo

    }
    setSend(true);
    setRes(await createUltimateDay(customFormData));
    setSend(false);

    console.log (customFormData)
  };

  useEffect(() => {
   useCreateNewDayError(res, setRes, setOk);
  }, [res]);


  useEffect(() => {
    

    console.log("data tramo", dataTramo)
  }, [dataTramo]);
  if (ok) {
    console.log('Creado con exito');
  }
  return (
    <>
      <div className="form-wrap">
        <h3>Crea un día con sus actividades</h3>
        <p>Formulario que crea las actividades calendarizadas</p>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="day_container form-group">
            <label htmlFor="costum-input" className="costum-placeholder">
              Dia de la semana:
            </label>
            <select id="type" name="type" {...register('day', { required: true })}>
              <option value="">Seleccione una sala</option>
              {dayOptionns.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
          <div className="dates_container form-group">
            <label htmlFor="costum-input" className="costum-placeholder">
              Fecha:
            </label>
            <input
              className="input_dates"
              type="date"
              id="dates"
              name="dates"
              autoComplete="dates"
              {...register('dates', { required: true })}
            />
          </div>

          <div className="type_container form-group">
            <label htmlFor="costum-input" className="costum-placeholder">
              Tipo de día:
            </label>
            <select
              id="type"
              name="type"
              onInput={handleType}
              {...register('type', { required: true })}
            >
              <option value="">Seleccione una sala</option>
              {typeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          

          <div className="tramos_container form-group">
            {
                tramosOk != null && tramos.slice(0,tramosOk).map((item)=> <FormActivity tramo={item} setDataTramo={setDataTramo} key={item }/> )

            }
          </div>

          <div className="btn_container">
            <button
              type="submit"
              disabled={send}
              style={{ background: send ? '#49c1a388' : '#49c1a2' }}
            >
              Crear día
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
