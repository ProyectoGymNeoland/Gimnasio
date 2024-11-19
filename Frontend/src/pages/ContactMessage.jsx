import "./ContactMessage.css"; 
import { InfoContact } from "../components";
import { useState, useEffect } from "react";
import { useGetAllContactsError } from "../hooks";
import { getAllContacts,deleteContacts } from '../services/contact.service';
import { useDeleteContactError } from '../hooks';

export const ContactMessage = () => {
    const [contacts, setContacts] = useState([]);
    const [res, setRes] = useState({});
    const [resDelete, setResDelete] = useState({});

    useEffect(() => {
    (async () => {
      setRes(await getAllContacts());
    })();
    }, []);

    useEffect(() => {
     useGetAllContactsError(res, setRes, setContacts);
    }, [res]);

    useEffect(() => {}, [contacts]);
     
    const handleDelete =(contactId)=>{
        (async()=>{
            setResDelete(await deleteContacts(contactId))
        })()
    }
    useEffect(() => {

        useDeleteContactError(resDelete, setResDelete,setContacts)

    
    }, [resDelete])


  return (
    <div id="containerContacts" className="contact-message-container">
        {console.log("que es contacts",contacts)}
        {console.log("que es resDeleted",resDelete)}
            {contacts.length > 0 ? (
                contacts?.map((contact) => (
                    <InfoContact
                        key={contact._id}
                        contact={contact}
                        handleDeleteClick={() =>handleDelete(contact._id)}
                    />
                ))
            ) : (
                <p>No se han encontrado mensajes.</p>
            )}
    </div>
    );
}