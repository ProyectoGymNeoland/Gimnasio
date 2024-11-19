import { useForm } from "react-hook-form";

import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { updateUser } from "../services/user.service";
import { useUpdateError } from "../hooks";
import { Uploadfile } from "../components";

export const UpdateUser = () => {
  const { user, setUser, logout } = useAuth();
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);

  //  ---> copiamos los datos que tenem os ahora mismo para ponerlo en el input como valor por defecto
  const defaultData = {
    name: user?.user,
  };

  //! ------------ 1) La funcion que gestiona el formulario----
  const formSubmit = (formData) => {
    Swal.fire({
      title: "Are you sure you want to change your data profile?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(73, 193, 162)",
      cancelButtonColor: "#d33",
      confirmButtonText: "YES",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const inputFile = document.getElementById("file-upload").files;

        if (inputFile.length != 0) {
          const custonFormData = {
            ...formData,
            image: inputFile[0],
          };

          setSend(true);
          setRes(await updateUser(custonFormData));
          setSend(false);
        } else {
          const custonFormData = {
            ...formData,
          };
          setSend(true);
          setRes(await updateUser(custonFormData));
          setSend(false);
        }
      }
    });
  };

  //! -------------- 2 ) useEffect que gestiona la parte de la respuesta ------- customHook

  useEffect(() => {
    console.log(res);
    useUpdateError(res, setRes, setUser, logout);
  }, [res]);

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
