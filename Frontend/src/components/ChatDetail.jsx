import React, { useEffect, useState } from 'react';
import { getChatById } from "../services/chat.service";
import { findMessageById } from "../services/message.service";
import { useGetChatError } from "../hooks"
import { useAuth } from '../context/authContext';
import { createMessage } from "../services/message.service"; // Importar la función createMessage
import { userMessageError } from '../hooks/userMessageError';
import { useParams } from 'react-router-dom';
import './ChatDetail.css';

export const ChatDetail = () => {
    const { chatId } = useParams();
    const [chat, setChat] = useState(null);
    const { user } = useAuth();
    const userId = user ? user._id : null;
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [res, setRes] = useState(null); // Estado para almacenar la respuesta del servidor
    const [userNotFound, setUserNotFound] = useState(false); // Estado para manejar el caso de usuario no encontrado
    const [newMessage, setNewMessage] = useState("");

    useGetChatError(res, setRes, setUserNotFound);
    userMessageError(res, setRes, setUserNotFound);

    const getChatUser = (chat, id) =>{

        if (chat.userTwo._id == id){ 
          console.log("if", chat.userTwo._id, id, chat.userOne._id)
          return chat.userOne._id 
        } else{
          console.log("else", chat.userTwo._id,id, chat.userOne._id)
          return chat.userTwo._id
        }
    }

     useEffect(() => {
        const fetchChat = async () => {
            try {
                const chatData = await getChatById(chatId);
                setChat(chatData);

                const messagesData = await Promise.all(
                    chatData.messages.map(messageId => findMessageById(messageId))
                );
                setMessages(messagesData);

                setLoading(false);
            } catch (err) {
                setError('Error al obtener los detalles del chat');
                setRes(err.response); // Almacenar la respuesta de error en el estado
                setLoading(false);
            }
        };

        if (chatId) {
            fetchChat();
        }
    }, [chatId]);

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;
    
        try {
            const response = await createMessage(getChatUser(chat, userId), newMessage);
            if (response.status === 200) {
                const { message } = response.data;

                // Añadir el mensaje al estado local
                setMessages((prevMessages) => [...prevMessages, message]);
                setNewMessage("");
                setRes(response);
            } else {
                throw new Error('Error al enviar el mensaje');
            }
        } catch (err) {
            setError('Error al enviar el mensaje');
            setRes(err.response);
        }
    };


    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="chat-detail">
            <div className="chat-header">
                <div>{chat.userOne.name} y {chat.userTwo.name}</div>
            </div>
            <div className="chat-messages">
                {messages.map((message) => (
                    <div key={message._id} className={`message-bubble ${message.owner === chat.userOne._id ? 'message-bubble-userone' : 'message-bubble-usertwo'}`}>
                        <div className="message-owner">
                            {message.owner === chat.userOne._id ? chat.userOne.name : chat.userTwo.name}
                        </div>
                        <div className="message-content">
                            {message.content}
                        </div>
                    </div>
                ))}
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
