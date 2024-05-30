import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext';
import { getChatsByUserId, deleteChat } from "../services/chat.service";
import { useNavigate } from 'react-router-dom';
import './ChatInput.css';
import { FaTrash } from 'react-icons/fa';
<<<<<<< HEAD
import { useGetChatError } from "../hooks" // Asegúrate de importar el hook de manejo de errores
=======
import {useGetChatError} from '../hooks/useGetChatError'; // Asegúrate de importar el hook de manejo de errores
>>>>>>> b4409633f6e90f0119e447b058f8c37d83b79139

export const ChatInput = () => {
    const { user } = useAuth();
    const userId = user ? user._id : null;
    const [chats, setChats] = useState([]);
    const [res, setRes] = useState(null); // Estado para almacenar la respuesta del servidor
    const [userNotFound, setUserNotFound] = useState(false); // Estado para manejar el caso de usuario no encontrado
    const navigate = useNavigate();

    // Usar el hook de manejo de errores
    useGetChatError(res, setRes, setUserNotFound);

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
                                userTwoInfo: chat?.userTwo?.name,
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
                    setRes(error.response); // Almacenar la respuesta de error en el estado
                }
            };

            fetchChats();
        }
    }, [userId]);

    const handleChatClick = (chatId) => {
        navigate(`/profile/chat/detail/${chatId}`);
    };

    const handleDeleteChat = async (chatId) => {
        try {
            await deleteChat(chatId);
            setChats(chats.filter(chat => chat._id !== chatId));
        } catch (error) {
            console.error("Error al eliminar el chat:", error);
            setRes(error.response); // Almacenar la respuesta de error en el estado
        }
    };

    return (
        <div>
            <h3>Chats Activos</h3>
            <ul>
                {chats.map((chat) => (
                    <li key={chat._id}>
                        <FaTrash className="trash-icon" onClick={() => handleDeleteChat(chat._id)} />
                        <div onClick={() => handleChatClick(chat._id)}>
                            <div>{chat.userTwoInfo}</div>
                            <div>{chat.lastMessageContent}</div>
                            <div>{chat.lastMessageDate}</div>
                        </div>
                    </li>
                ))}
            </ul>
            {userNotFound && <p>Usuario no encontrado</p>} {/* Mostrar mensaje si el usuario no se encuentra */}
        </div>
    );
};