import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { checkCodeConfirmationUser, resendCodeConfirmationUser } from "../services/user.service";
import { useAuth } from "../context/authContext";
import { useCheckCodeError, useAutoLogin, useResendCodeError } from "../hooks";

export const CheckCode = () => {
    //! ESTADOS
    const { allUser, login, setUser } = useAuth();
    const { register, handleSubmit } = useForm();
    // EL RES Va a ser para el check del code confirmation, aqui se guarda el user y el confirmationCode
    const [res, setRes] = useState({});
    // resResend va a ser para gestionar el renvio del codigo de confirmacion
    const [resResend, setResResend] = useState({});
    // estados de carga y de ok
    const [send, setSend] = useState(false);
    const [okCheck, setOkCheck] = useState(false);

    // ------> estos dos estados se utilizan para cuando se recarga la pagina por el usuario
    const [okDeleteUser, setOkDeleteUser] = useState(false); // si es ok vamos al register
    const [userNotFound, setUserNotFound] = useState(false); // si es ok vamos al login

    //! 1) funcion que gestiona los datos del formulario y funcion de reenviar codigo
    const formSubmit = async (formData) => {
        // comprobamos si hay un usuario en el localStorage, si hay significa que hay un usuario logueado
        const userLocal = localStorage.getItem('user')

        // condicion para saber si hay algo en localStorage o si no
        if (userLocal == null) {
            // entramos por el register -- no hay un usuario logueado
                // el confirmationCode que viene del formulario es un string y hay que convertirlo en number con el metodo parseInt
            const customFormData = {
                confirmationCode: parseInt(formData.confirmationCode),
                email: allUser.data.user.email,
            }
            setSend(true)
            setRes(await checkCodeConfirmationUser(customFormData))
            setSend(false)
        } else {
            // entramos por el login -- hay un usuario logueado
            const parseUser = JSON.parse(userLocal);
            const customFormData = {
                confirmationCode: parseInt(formData.confirmationCode),
                email: parseUser.email,
            }
            setSend(true)
            setRes(await checkCodeConfirmationUser(customFormData))
            setSend(false)
        }
    };

    const handleReSend = async () => {
        const userLocal = localStorage.getItem('user')
        if (userLocal !== null) {
            // entramos por el login 
            const parseUser = JSON.parse(userLocal);
            const customFormData = {
                email: parseUser.email,
            }
            setSend(true)
            const response = await resendCodeConfirmationUser(customFormData);
            setResResend(response);

            //resResend(await resendCodeConfirmationUser(customFormData))
            setSend(false)
        } else {
            // entramos por el register 
            const customFormData = {
                email: allUser?.data?.user?.email,
            }
            setSend(true)
            const response = await resendCodeConfirmationUser(customFormData);
            setResResend(response);
            //resResend(await resendCodeConfirmationUser(customFormData))
            setSend(false)
        }
    }

    //! 2) hooks que gestiona los errores
    useEffect(() => {
        useCheckCodeError(
            res,
            setRes,
            setOkCheck,
            setOkDeleteUser,
            login,
            setUserNotFound
        )
    }, [res])

    useEffect(() => {
        useResendCodeError(
            resResend,
            setResResend,
            setUserNotFound
        )
    }, [resResend])

    //! 3) estados de navegacion
   if (okCheck) {
        // aqui vamos a hacer el autologin cuando el usuario viene del register
        // cuando viene del login lo gestionamos en le useCheckCodeError
        if(!localStorage.getItem('user')) {
            useAutoLogin(allUser, login)
        } else {
            return <Navigate to="/profile"/>
}
    }

    if (okDeleteUser) {
        // el codigo de confirmacion no es correcto asi que hemos borrado el usuario
        return <Navigate to="/register"/>
    }

    if (userNotFound) {
        // no puede acceder al codigo de confirmacion del usuario porque no lo encuentra
        console.log("me voy al registro")
    }

    return (
        <>
        <div className="form-wrap">
            <h1>Verifica tu código 👌</h1>
            <p>Escribe el código que te hemos enviado a tu email</p>
            <form onSubmit={handleSubmit(formSubmit)}>
            <div className="user_container form-group">
                <input
                className="input_user"
                type="text"
                id="name"
                name="name"
                autoComplete="false"
                {...register("confirmationCode", { required: false })}
                />
                <label htmlFor="custom-input" className="custom-placeholder">
                Registration code
                </label>
            </div>

            <div className="btn_container">
                <button
                id="btnCheck"
                className="btn"
                type="submit"
                disabled={send}
                style={{ background: send ? "#49c1a388" : "#49c1a2" }}
                >
                Verificar código
                </button>
            </div>
            <div className="btn_container">
                <button
                id="btnResend"
                className="btn"
                disabled={send}
                style={{ background: send ? "#49c1a388" : "#49c1a2" }}
                onClick={() => handleReSend()}
                >
                Reenviar código
                </button>
            </div>

            <p className="bottom-text">
                <small>
                Si tu código es incorrecto ❌, tu usuario será borrado de la base de datos, y tendrás 
                que registrarte de nuevo.{" "}
                </small>
            </p>
            </form>
        </div>
    </>
    )
}
