

export const ForgotPassword = () => {
  return  (
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
