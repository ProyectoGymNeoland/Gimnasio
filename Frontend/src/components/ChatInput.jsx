// ChatInput.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext';
import { getChatsByUserId } from "../services/chat.service";
import { useNavigate } from 'react-router-dom';
import './ChatInput.css';

export const ChatInput = () => {
    const { user } = useAuth();
    const userId = user ? user._id : null;
    const [chats, setChats] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (userId) {
            const fetchChats = async () => {
                try {
                    const response = await getChatsByUserId(userId);
                    console.log("Chats recibidos componente:", response);
                    if (response) {
                        const chatsWithDetails = response.map((chat) => {
                            const lastMessage = chat.messages.length > 0 ? chat.messages[chat.messages.length - 1] : null;
                            return {
                                ...chat,
                                userTwoInfo: chat.userTwo.name,
                                lastMessageContent: lastMessage ? lastMessage.content : "No hay mensajes",
                                lastMessageDate: lastMessage ? new Date(lastMessage.createdAt).toLocaleDateString() : null,
                            };
                        });
                        setChats(chatsWithDetails);
                    } else {
                        console.log("No se recibieron datos de chats");
                    }
                } catch (error) {
                    console.error("Error al obtener los chats:", error);
                }
            };

            fetchChats();
        }
    }, [userId]);

    const handleChatClick = (chatId) => {
        navigate(`/profile/chat/detail/${chatId}`);
    };

    return (
        <div>
            <h3>Chats Activos</h3>
            <ul>
                {chats.map((chat) => (
                    <li key={chat._id} onClick={() => handleChatClick(chat._id)}>
                        <div>{chat.userTwoInfo}</div>
                        <div>{chat.lastMessageContent}</div>
                        <div>{chat.lastMessageDate}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
