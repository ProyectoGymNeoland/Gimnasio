import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { updateUser } from "../services/user.service";
import { registerUser } from "../services/user.service";
import { useUpdateError } from "../hooks";
import { useAuth } from "../context/authContext";
import { Link, Navigate } from "react-router-dom";
import { Uploadfile } from "../components";

export const UpdateUser = () => {

    //! 1) crear los estados
    const [ res, setRes ] = useState({});
    const [ send, setSend ] = useState(false);
    const [ ok, setOk ] = useState(false);
    const { allUser, setAllUser, bridgeData, updateUserContext } = useAuth();
 
    //! 2) llamada al hook de react hook form
    const { register, handleSubmit } = useForm();

    //! 3) la funcion que gestiona los datos del formulario
    const formSubmit = async (formData) => {
        const inputFile = document.getElementById("file-upload").files;

        //* condicional para enviar los datos del formulario al backend tanto si hay subida imagen como si no
        if (inputFile.lenght != 0) {
            // si es diferente a 0 es que hay algo dentro de files
            const customFormData = {
                ...formData,
                image: inputFile[0],
            }
            //llamada al backend
            setSend(true);
            setRes(await updateUser(customFormData));
            setSend(false);
        } else {
            // si no hay imagen solo hago una copia del formData
            const customFormData = {
                ...formData,
            }
            //llamada al backend
            setSend(true);
            setRes(await updateUser(customFormData));
            setSend(false);
        }
    }

//! 4) useEffects que gestionan la repuesta y manejan los errores
useEffect(() => {
    useUpdateError(res, setRes, setOk, updateUserContext);
    // si la res es ok llamamos a la funcion puente del contexto y le pasamos el parámetro ALLUSER
    if (res?.status == 200) bridgeData('ALLUSER')
}, [res])

useEffect(() => {
    console.log('allUser 🤡', allUser);
}, [allUser])

 //! 5) estados de navegacion
 if (ok) {
    return <Navigate to="/login"/>
}

    return (
        <>
        <div className="form-wrap">
            <h1>Update</h1>
            <p>It’s free and only takes a minute.</p>
            <form onSubmit={handleSubmit(formSubmit)} >
            <div className="user_container form-group">
                <input
                className="input_user"
                type="text"
                id="name"
                name="name"
                autoComplete="false"
                {...register("name", { required: true })}
                />
                <label htmlFor="custom-input" className="custom-placeholder">
                username
                </label>
            </div>
            <div className="age_container form-group">
                <input
                className="input_user"
                type="age"
                id="age"
                name="age"
                autoComplete="false"
                {...register("age", { required: true })}
                />
                <label htmlFor="custom-input" className="custom-placeholder">
                Edad
                </label>
            </div>
            <Uploadfile />
            <div className="btn_container">
                <button
                className="btn"
                type="submit"
                disabled={send}
                style={{ background: send ? "#49c1a388" : "#2f7a67" }}
                >
                { send ? "Cargando..." : "UpdateUser" }
                </button>
            </div>
            </form>
        </div>
    </>
    )
}
