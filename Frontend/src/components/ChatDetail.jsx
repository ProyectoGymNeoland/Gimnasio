import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getChatById } from "../services/chat.service";
import { findMessageById } from "../services/message.service";
import './ChatDetail.css';

export const ChatDetail = () => {
    const { chatId } = useParams();
    const [chat, setChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        const fetchChat = async () => {
            try {
                const chatData = await getChatById(chatId);
                setChat(chatData);

                // Fetch messages in parallel
                const messagesData = await Promise.all(
                    chatData.messages.map(messageId => findMessageById(messageId))
                );
                setMessages(messagesData);

                setLoading(false);
            } catch (err) {
                setError('Error al obtener los detalles del chat');
                setLoading(false);
            }
        };

        if (chatId) {
            fetchChat();
        }
    }, [chatId]);

    const handleSendMessage = async () => {
        // Aquí irá la lógica para enviar un nuevo mensaje
        // Posteriormente se actualizarán los mensajes
    };

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;

    return (
      <div className="chat-detail">
          <div className="chat-header">
              <div>{chat.userOne.name} y {chat.userTwo.name}</div>
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
          <div className="chat-input">
              <input 
                  type="text" 
                  value={newMessage} 
                  onChange={(e) => setNewMessage(e.target.value)} 
                  placeholder="Escribe un mensaje..." 
              />
              <button onClick={handleSendMessage}>SEND</button>
          </div>
      </div>
    );
};
