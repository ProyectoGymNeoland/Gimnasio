import { useForm } from "react-hook-form";
import { createContacts } from "../services/contact.service";
import { useEffect, useState } from "react";
import { useCreateContactError } from "../hooks";
 export const ContactUs = () => {
  const {register,handleSubmit}= useForm();
 const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [ok, setOk] = useState(false);

  const formSubmit = async (formData) => {
    console.log("formData", formData);
    setSend(true);
    setRes(await createContacts(formData));
    setSend(false);
  }

   useEffect(() => {
    // aqui voy a llamar a un customHook para gestionar los errores
    useCreateContactError(res, setRes, setOk);
    console.log('res', res);
  }, [res]);
  if(ok){
    console.log("Tu duda ha sido enviada");
  }
  return (
    <>
    <div className="form-wrap">
      <h1>Contact Us</h1>
      <p>Comentanos con cualquier duda que te surja.</p>
      <form onSubmit={handleSubmit(formSubmit)}>  
        <div className="email_container form-group"> 
        {/*CORREO*/}
        <label htmlFor="custom-input" className="custom-placeholder">email</label>
        <input type="email" id="email" name="email" {...register("email", { required: true })}/>
        </div>
     
        <div className="name_container form-group">
       {/*NOMBRE*/}
        <label htmlFor="custom-input" className="custom-placeholder">name</label>
        <input type="text" id="name" name="name"{...register("name", { required: true })}/>
        </div>


        <div className="telephone_container form-group">
        {/*TELEFONO*/}
        <label htmlFor="custom-input" className="custom-placeholder">telephone</label>
        <input type="tel" placeholder="+34 699 345 899" id="telephone" name="telephone"{...register("telephone", { required: true })}/>
        </div>
     
        <div className="content_container form-group">
       {/*CONTENIDO*/}
        <label htmlFor="custom-input" className="custom-placeholder">content</label>
        <textarea type="text" required placeholder="Mensaje..." id="content" name="content" {...register("content", { required: true })}/>
        </div>
      

        <div className="button">
        <button type="submit" disabled={send}
        style={{ background: send ? "#49c1a388" : "#49c1a2" }}>Enviar</button>
        </div>
      
    </form>
    </div>
    </>
  )
}

