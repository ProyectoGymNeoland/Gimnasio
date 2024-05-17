import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { forgotPasswordUser } from "../services/user.service";
import { useErrorPassword } from "../hooks";

export const ForgotPassword = () => {

//! 1) crear los estados
    const { register, handleSubmit } = useForm();

const [ res, setRes ] = useState({});
const [ send, setSend ] = useState(false);
const [ okForgot, setOkForgot ] = useState(false);

//! 2) hooks que gestiona los errores
    useEffect(() => {
useErrorPassword(res, setRes, setOkForgot)    
    }, [res])

const formSubmit = async (formData) => {
        setSend(true);
        try {
            const response = await forgotPasswordUser(formData);
            if (response.status === 200) {
                setOkForgot(true);
            } else {
                setRes(response.data.message);
            }
        } catch (error) {
            setRes("An error occurred. Please try again.");
        }
        setSend(false);
    };


 //! 3) estados de navegacion
 if (okForgot) {
    return <Navigate to="/dashboard"/>
}
  return  (
        <>
            <div className="form-wrap">
            <h1>Modify Password</h1>
            <p>Enter your new password</p>
            <form onSubmit={handleSubmit(formSubmit)}>
                <div className="password_container form-group">
                <input
                className="input_user"
                type="password"
                id="password"
                name="old_password"
                autoComplete="false"
                {...register("password", { required: true })}
                />
                <label htmlFor="custom-input" className="custom-placeholder">
                Old password
                </label>
            </div>
    
                <div className="password_container form-group">
                <input
                className="input_user"
                type="password"
                id="password"
                name="new_password"
                autoComplete="false"
                {...register("password", { required: true })}
                />
                <label htmlFor="custom-input" className="custom-placeholder">
                New password
                </label>
            </div>
                <div className="btn_container">
                <button
                    className="btn"
                    type="submit"
                    disabled={send}
                    style={{ background: send ? "#49c1a388" : "#49c1a2" }}
                >
                    MODIFY PASSWORD
                </button>
                </div>
                
            </form>
            </div>
            <div className="footerForm">
            <p className="parrafoLogin">
                Are you not registered? <Link to="/register">Register Here</Link>
            </p>
            </div>
        </>
    )
}