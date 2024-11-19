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
      setRes(await forgotPasswordUser(formData));
      setSend(false);
    };


 //! 3) estados de navegacion
 if (okForgot) {
    return <Navigate to="/login"/>
}
  return  (
        <>
            <div className="form-wrap">
            <h1>Forgot Password</h1>
            <p>Enter your email address to receive a password reset link</p>
            <form onSubmit={handleSubmit(formSubmit)}>
                <div className="email_container form-group">
                <input
                    className="input_user"
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="false"
                    {...register("email", { required: true })}
                />
                <label htmlFor="custom-input" className="custom-placeholder">
                    email
                </label>

                </div>
    
                <div className="btn_container">
                <button
                    className="btn"
                    type="submit"
                    disabled={send}
                    style={{ background: send ? "#49c1a388" : "#49c1a2" }}
                >
                    RESEND PASSWORD
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
