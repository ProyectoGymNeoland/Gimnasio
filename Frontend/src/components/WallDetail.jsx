import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWallById, createPublicMessage } from '../services/wall.service';
import './ActivityDetail.css';
import './WallDetail.css';
import './ChatDetail.css';

const WallDetail = ({ wall: initialWall, wallId }) => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [wall, setWall] = useState(initialWall || null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!initialWall && wallId) {
      console.log("useeffect")
      const fetchWall = async () => {
        try {
          console.log("wallId", wallId)
          const fetchedWall = await getWallById(wallId);
          setWall(fetchedWall);
          console.log("comments", fetchedWall.comments)
          setMessages(fetchedWall.comments || []);
          console.log('Fetched Wall:', fetchedWall, messages);
        } catch (error) {
          console.error('Error fetching wall:', error);
        }
      }
      fetchWall();
    } else if (initialWall) {
      setWall(initialWall);
      setMessages(initialWall.comments || []);
      console.log('Segundo Initial Wall:', initialWall);
    }
  }, [initialWall, wallId]);

  const handleSendMessage = async () => {
    try {
      const response = await createPublicMessage(wall._id, { content: newMessage });
      if (response.wall && response.wall.comments) {
        setMessages(response.wall.comments);
      } else {
        console.error('Unexpected response structure:', response);
      }
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleButtonClick = () => {
    navigate('/');
  };

  if (!wall) {
    return <div>Crear página 404 VER CON PEDRO...</div>;
  }

  return (
    <div className="activity-detail">
      <h1>{wall.name}</h1>
      <p className="spots">Número de plazas: {wall.spots}</p>
      <p className="type">Tipo de actividad: {wall.type}</p>
      <p className="type">
        Status:
        <span className={wall.status ? 'available' : 'not-available'}>
          {wall.status ? 'Disponible' : 'No disponible'}
        </span>
      </p>
      <img src={wall.image} alt={wall.name} />
      <h3>Te contamos en qué consiste</h3>
      <p className="description">{wall.content}</p>
      <button onClick={handleButtonClick}>Comentarios</button>
      <button onClick={handleButtonClick}>Reservar</button>
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
        {messages.length > 0 ? (
          messages.map((message) => (
            <div key={message._id} className="message">
              <p><strong>{message.owner ? message.owner.name : 'Anónimo'}:</strong></p>
              <p>{message.content}</p>
            </div>
          ))
        ) : (
          <p>No hay mensajes aún.</p>
        )}
      </div>
    </div>
  );
};

export default WallDetail;