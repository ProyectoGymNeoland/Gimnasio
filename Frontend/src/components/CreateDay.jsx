import { useState } from "react";
import { useForm } from "react-hook-form"
import { createDay } from "../services/day.service";
import { useEffect } from "react";
import { useCreateDayError, useSelectFrame } from "../hooks";


export const CreateDay = ()=>{
    const {register,handleSubmit}=useForm();
    const [res,setRes]=useState({});
    const [send,setSend]=useState(false);
    const [ok,setOk]=useState(false);

    const typeOptions=["Habil", "Finde", "Festivo"];
    const {selectedType,handleType,renderHabil,renderFestivo,renderFinde}= useSelectFrame(register);

   

    const formSubmit=async (formData)=>{
        setSend(true);
        setRes(await createDay(formData));
        setSend(false);
    }

    useEffect(()=>{
        useCreateDayError(res,setRes,setOk);
    },[res]);

    if(ok){
    console.log("Creado con exito");
    }
        return(
           <>
           <div className="form-wrap">
                <h3>Crea un día con sus actividades</h3>
                <p>Formulario que crea las actividades calendarizadas</p>
                <form onSubmit={handleSubmit(formSubmit)}>
                <div className="day_container form-group">
                    <label htmlFor="costum-input" className="costum-placeholder">Dia de la semana:</label>
                    <input
                    className="input_day"
                    type="text"
                    id="week-day"
                    name="week-day"
                    autoComplete="false"
                    {...register("day",{required:true})}
                    />

                </div>
                <div className="dates_container form-group">
                    <label htmlFor="costum-input" className="costum-placeholder">Fecha:</label>
                    <input
                    className="input_dates"
                    type="date"
                    id="dates"
                    name="dates"
                    autoComplete="dates"
                    {...register("dates",{required:true})}
                    />
                </div>

                <div className="type_container form-group">
                    <label htmlFor="costum-input" className="costum-placeholder">Tipo de día:</label>
                    <select
                    id="type"
                    name="type"
                    onInput={handleType}
                    {...register("type",{required:true})}><option value="">Seleccione una sala</option>
                        {typeOptions.map((type) => (
                        <option key={type} value={type}>{type}</option>
                        ))}</select>
                </div>



                <div className="tramos_container form-group">
                {selectedType === 'Habil' && renderHabil()}
                {selectedType === 'Finde' && renderFinde()}
                {selectedType === 'Festivo' && renderFestivo()}
                </div>
                
                <div className="btn_container">
                        <button type="submit" disabled={send} style={{ background: send ? "#49c1a388" : "#49c1a2" }}>
                        Crear día
                        </button>
                </div>

                </form>

           </div>
           </> 
        )
}