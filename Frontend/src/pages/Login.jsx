import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { loginUserService } from '../services/user.service';
import { useLoginError } from '../hooks/useLoginError';
//import { useLoginError } from "../hooks"
import './Login.css';

export const Login = () => {
  //! estados
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [loginOk, setLoginOk] = useState(false);
  const { login, setUser } = useAuth();

  //! 1) funcion que gestiona los datos del formulario
  const formSubmit = async (formData) => {
    // llamada al backend
    setSend(true);
    setRes(await loginUserService(formData));
    setSend(false);
  };

  //! 2) hooks que gestiona los errores
  useEffect(() => {
    useLoginError(res, setRes, login, setLoginOk);
  }, [res]);

  useEffect(() => {
    setUser(() => null);
    localStorage.removeItem('user');
  }, []);

  //! 3) estados de navegacion
  if (loginOk) {
    if (res.data.user.check === false) {
      return <Navigate to="/verifyCode" />;
    } else {
      return <Navigate to="/profile" />;
    }
  }

  return (
    <>
      <div className="form-wrap">
        <h1>Sign In</h1>
        <p>We are happy to see you again 💌</p>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="email_container form-group">
            <input
              className="input_user"
              type="email"
              id="email"
              name="email"
              autoComplete="false"
              {...register('email', { 
                required: 'Email is required', 
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Invalid email address'
                } 
              })}
            />
            <label htmlFor="email" className="custom-placeholder">
              email
            </label>
            {errors.email && <p className="error-message">{errors.email.message}</p>}

            <div className="password_container form-group">
              <input
                className="input_user"
                type="password"
                id="password"
                name="password"
                autoComplete="false"
                {...register('password', { 
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
              />
              <label htmlFor="password" className="custom-placeholder">
                password
              </label>
              {errors.password && <p className="error-message">{errors.password.message}</p>}
            </div>
          </div>

          <div className="btn_container">
            <button
              className="btn"
              type="submit"
              disabled={send}
              style={{ background: send ? '#49c1a388' : '#49c1a2' }}
            >
              LOGIN
            </button>
          </div>
          <p className="bottom-text">
            <small>
              Have you forgotten the password?
              <Link to="/forgotPassword" className="anchorCustom">
                Change password
              </Link>
            </small>
          </p>
        </form>
      </div>
      <div className="footerForm">
        <p className="parrafoLogin">
          Are you not registered? <Link to="/register">Register Here</Link>
        </p>
      </div>
    </>
  );
};