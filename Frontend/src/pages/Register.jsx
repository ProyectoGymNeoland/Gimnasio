import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { registerUser, checkUsername } from "../services/user.service";
import { useErrorRegister } from "../hooks";
import { useAuth } from "../context/authContext";
import { Link, Navigate } from "react-router-dom";
import { Uploadfile } from "../components";
import './Register.css';
export const Register = () => {
    const [res, setRes] = useState({});
    const [send, setSend] = useState(false);
    const [ok, setOk] = useState(false);
    const { allUser, setAllUser, bridgeData } = useAuth();
    const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm();

    const formSubmit = async (formData) => {
        const inputFile = document.getElementById("file-upload").files;

        const customFormData = {
            ...formData,
            ...(inputFile.length !== 0 && { image: inputFile[0] }),
        };
        
        setSend(true);
        setRes(await registerUser(customFormData));
        setSend(false);
    }

    const validateUsername = async (username) => {
        const result = await checkUsername(username);
        if (result && result.status === 409) {
            setError("name", {
                type: "manual",
                message: "Este nombre de usuario ya existe, elige otro"
            });
            return false;
        } else {
            clearErrors("name");
            return true;
        }
    };

    useEffect(() => {
        useErrorRegister(res, setRes, setOk);
        if (res?.status === 200) bridgeData('ALLUSER')
    }, [res]);

    useEffect(() => {
        console.log('allUser 🤡', allUser);
    }, [allUser]);

    if (ok) {
        return <Navigate to="/verifyCode"/>
    }

    return (
        <>
            <div className="form-wrap">
                <h1>Sign Up</h1>
                <p>It’s free and only takes a minute.</p>
                <form onSubmit={handleSubmit(formSubmit)} >
                    <div className="user_container form-group">
                        <input
                            className="input_user"
                            type="text"
                            id="name"
                            name="name"
                            autoComplete="off"
                            {...register("name", {
                                required: "Tienes que poner un nombre de usuario",
                                validate: async (value) => await validateUsername(value)
                            })}
                        />
                        <label htmlFor="custom-input" className="custom-placeholder">
                            username
                        </label>
                        {errors.name && <p className="error-message">{errors.name.message}</p>}
                    </div>

                    <div className="password_container form-group">
                        <input
                            className="input_user"
                            type="password"
                            id="password"
                            name="password"
                            autoComplete="off"
                            {...register("password", { required: "Tienes que introducir una contraseña" })}
                        />
                        <label htmlFor="custom-input" className="custom-placeholder">
                            password
                        </label>
                        {errors.password && <p className="error-message">{errors.password.message}</p>}
                    </div>

                    <div className="email_container form-group">
                        <input
                            className="input_user"
                            type="email"
                            id="email"
                            name="email"
                            autoComplete="off"
                            {...register("email", { required: "Necesitamos tener tu email" })}
                        />
                        <label htmlFor="custom-input" className="custom-placeholder">
                            email
                        </label>
                        {errors.email && <p className="error-message">{errors.email.message}</p>}
                    </div>

                    <div className="sexo">
                        <input
                            type="radio"
                            name="gender"
                            id="hombre"
                            value="hombre"
                            {...register("gender", { required: "El género es un campo requerido" })}
                        />
                        <label htmlFor="hombre" className="label-radio hombre">
                            Hombre
                        </label>
                        <input
                            type="radio"
                            name="gender"
                            id="mujer"
                            value="mujer"
                            {...register("gender")}
                        />
                        <label htmlFor="mujer" className="label-radio mujer">
                            Mujer
                        </label>
                        <input
                            type="radio"
                            name="gender"
                            id="otros"
                            value="otros"
                            {...register("gender")}
                        />
                        <label htmlFor="otros" className="label-radio otros">
                            Otros
                        </label>
                        {errors.gender && <p className="error-message">{errors.gender.message}</p>}
                    </div>

                    <div className="age_container form-group">
                        <input
                            className="input_user"
                            type="number"
                            id="age"
                            name="age"
                            autoComplete="off"
                            {...register("age", { required: "Tienes que poner tu edad" })}
                        />
                        <label htmlFor="custom-input" className="custom-placeholder">
                            Edad
                        </label>
                        {errors.age && <p className="error-message">{errors.age.message}</p>}
                    </div>

                    <Uploadfile />

                    <div className="btn_container">
                        <button
                            className="btn"
                            type="submit"
                            disabled={send}
                            style={{ background: send ? "#49c1a388" : "#2f7a67" }}
                        >
                            {send ? "Cargando..." : "Register"}
                        </button>
                    </div>
                </form>
            </div>
            <div className="footerForm">
                <p className="parrafoLogin">
                    ¿Ya tienes una cuenta? <Link to="/login">Haz Login aquí</Link>
                </p>
            </div>
        </>
    );
}