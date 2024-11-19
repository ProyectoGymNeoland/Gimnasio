import React, { useState } from 'react';
import { userMessageError} from '../hooks/userMessageError'; // Asegúrate de ajustar la ruta de importación
import { createMessage } from '../services/message.service.js'; // Asegúrate de ajustar la ruta de importación
import { useAuth } from '../context/authContext'; // Ajusta la ruta de importación

const MessageComponent = () => {
  const { user } = useAuth();
  const [res, setRes] = useState(null);
  const [userNotFound, setUserNotFound] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const [messageType, setMessageType] = useState('public'); // Inicializamos con un valor por defecto
  const [idRecipient, setIdRecipient] = useState('');
  const [message, setMessage] = useState('');

  // Simulación de llamada al backend para crear un mensaje
  const handleCreateMessage = async (event) => {
    event.preventDefault();
    console.log('Handling message creation...');

    if (!user) {
      setUserNotFound(true);
      return;
    }

    try {
      const res = await createMessage(idRecipient, {
        type: messageType, // Usamos messageType aquí
        content: message,
        owner: user._id, // Añadimos el id del usuario logado
      });
      setRes(res);
      if (res.status === 200 && res.data.comment) {
        setMessageContent(res.data.comment.content); // Ajusta según la estructura de tu respuesta
        setMessageType(res.data.comment.type); // Ajusta según la estructura de tu respuesta
        resetForm(); // Resetea el formulario después de un envío exitoso
      }
    } catch (error) {
      setRes(error);
    }
  };

    // Función para resetear el formulario
    const resetForm = () => {
      setMessage('');
      setMessageType('');
      setIdRecipient('');
    };

  // Utiliza el custom hook para manejar los errores del backend
  userMessageError(res, setRes, setUserNotFound);

  // Maneja el cambio en el campo del idRecipient
  const handleRecipientChange = (event) => {
    setIdRecipient(event.target.value);
  };

  // Maneja el cambio en el campo del mensaje
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  // Maneja el cambio en el campo del tipo de mensaje
  const handleTypeChange = (event) => {
    setMessageType(event.target.value);
  };

  return (
    <div className="form-wrap">
      <form onSubmit={handleCreateMessage}>
        <div className='form-group'>
          <label>
            Type:
            <select name="type" value={messageType} onChange={handleTypeChange}>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </label>
        </div>
        <div className='form-group'>
          <label className="custom-placeholder">
            Recipient:
            <input
              className="input_user"
              type="text"
              value={idRecipient}
              onChange={handleRecipientChange}
              required
            />
          </label>
        </div>
        <div className='form-group'>
          <label className="custom-placeholder">
            Message Content:
            <textarea
              className="input_user"
              value={message}
              onChange={handleMessageChange}
              required
            />
          </label>
        </div>
        <button className='btn' type="submit">Create Message</button>
      </form>

      {userNotFound && <p>User not found. Please login.</p>}
      {messageContent && (
        <div>
          <h3>Message Details:</h3>
          <p>Owner: {user.name}</p>
          <p>Recipient ID: {idRecipient}</p>
          <p>Type: {messageType}</p>
          <p>Content: {messageContent}</p>
        </div>
      )}
    </div>
  );
};

export default MessageComponent;
