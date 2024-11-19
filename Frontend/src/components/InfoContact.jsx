import './InfoContact.css';

export const InfoContact = ({contact,handleDeleteClick}) => {
   
return (
    <div className="contact-info">
      <div className="contact-info-header">
        <h4>Duda de {contact.name}</h4>
        <p><span>Correo:</span> {contact.email}</p>
      </div>
      <div className="contact-info-details">
        <p><span>Teléfono:</span> {contact.telephone}</p>
        <p><span>Contenido:</span> {contact.content}</p>
      </div>
      <button onClick={handleDeleteClick} >Eliminar</button>
    </div>
  );
} 