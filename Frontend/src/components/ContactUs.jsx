import { useForm } from "react-hook-form";
import { createContacts } from "../services/contact.service";
import { useEffect, useState } from "react";
import { useCreateContactError } from "../hooks";
import './ContactUs.css'; 

 export const ContactUs = () => {
  const {register,handleSubmit,reset}= useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [ok, setOk] = useState(false);
  const [telephoneError, setTelephoneError] = useState("");
  const formSubmit = async (formData) => {
    const phoneNumber = formData.telephone;
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
    let fullPhoneNumber = formattedPhoneNumber;
    if (!fullPhoneNumber.startsWith('+34')) {
      fullPhoneNumber = `+34${formattedPhoneNumber.replace(/\s+/g, '').replace(/-/g, '')}`;
    }
    formData.telephone = fullPhoneNumber;
    console.log("formData", formData);
    setSend(true);
    setRes(await createContacts(formData));
    setSend(false);
  }
  const formatPhoneNumber = (phoneNumber) => {
  const formattedPhoneNumber = phoneNumber.replace(/\s+/g, '').replace(/-/g, '');
  
  if (!formattedPhoneNumber.startsWith('+34')) {
    return `+34${formattedPhoneNumber}`;
  }

  return formattedPhoneNumber;
}

   useEffect(() => {
    // aqui voy a llamar a un customHook para gestionar los errores
    useCreateContactError(res, setRes, setOk,setTelephoneError,reset);
    console.log('res', res);
  }, [res]);
  if(ok){
    console.log("Tu duda ha sido enviada");
  }
  return (
    <>
    <div className="form-wrap">
    <h1>¡Contacta con nosotros!</h1>
      <h5>Comenta aquí cualquier duda</h5>
      <form onSubmit={handleSubmit(formSubmit)}> 

        <div className="name_container form-group">
       {/*NOMBRE*/}
        <label htmlFor="custom-input" className="custom-placeholder">Name</label>
        <input type="text" id="name" name="name"{...register("name", { required: true })}/>
        </div>

        <div className="email_container form-group"> 
        {/*CORREO*/}
        <label htmlFor="custom-input" className="custom-placeholder">Email</label>
        <input type="email" id="email" name="email" {...register("email", { required: true })}/>
        </div>
     
        <div className="telephone_container form-group">
        {/*TELEFONO*/}
        <label htmlFor="custom-input" className="custom-placeholder">Telephone</label>
        <input type="text" placeholder="+34 612 345 789" id="telephone" name="telephone"{...register("telephone", { required: true })} style={{ borderColor: telephoneError ? 'red' : '' }}/>
        {telephoneError && <span style={{ color: 'red' }}>{telephoneError}</span>}
        </div>
     
        <div className="content_container form-group">
       {/*CONTENIDO*/}
        <label htmlFor="custom-input" className="custom-placeholder">Content</label>
        <textarea type="text" required placeholder="Mensaje..." id="content" name="content" {...register("content", { required: true })}/>
        </div>
      

        <div className="buttonenviar">
        <button type="submit" disabled={send}
        style={{ background: send ? "#49c1a388" : "#49c1a2" }}>Enviar</button>
        </div>
      
    </form>
    </div>
    </>
  )
}

