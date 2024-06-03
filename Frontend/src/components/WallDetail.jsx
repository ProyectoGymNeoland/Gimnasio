import './ActivityDetail.css';
import "./WallDetail.css"
import './ChatDetail.css'
import React, { useEffect, useState } from 'react';
import { getWallById } from '../services/wall.service';

const WallDetail = ({ wall }) => {

  const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);
  
  if (!wall) {
    return <div>Crear página 404 VER CON PEDRO...</div>;
  }
const handleSendMessage = async () => {
        // Aquí irá la lógica para enviar un nuevo mensaje
        // Posteriormente se actualizarán los mensajes
    };
  const handleButtonClick = ()=>{
  navigate("/")
}

  return (
    <div className="activity-detail">
      <h1>{wall.name}</h1>
      <p className="spots">Número de plazas: {wall.spots}</p>
      <p className="type">Tipo de actividad: {wall.type}</p>
      <p className="type">
      </p>
      <img src={wall.image} alt={wall.name} />
      <h3>Te contamos en qué consiste</h3>
      <p className="description">{wall.content}</p>
      <button onClick={ handleButtonClick }>Comentarios</button>
    <div className="chat-input">
              <input 
                  type="text" 
                  value={newMessage} 
                  onChange={(e) => setNewMessage(e.target.value)} 
                  placeholder="Escribe un mensaje..." 
              />
              <button onClick={handleSendMessage}>SEND</button>
          </div>
          <div className="chat-messages">
              {messages.map((message) => {
                  console.log('message._id:', message._id); // Log para verificar el _id
                  return (
                      <div key={message._id} className={`message-bubble ${message.owner === chat.userOne._id ? 'message-bubble-userone' : 'message-bubble-usertwo'}`}>
                          <div className="message-owner">
                              {message.owner === chat.userOne._id ? chat.userOne.name : chat.userTwo.name}
                          </div>
                          <div className="message-content">
                              {message.content}
                          </div>
                      </div>
                  );
              })}
          </div>
          </div>
    
  );
};

export default WallDetail;