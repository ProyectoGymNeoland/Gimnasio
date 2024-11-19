import { useState } from 'react';
import { useAuth } from '../context/authContext'; 
import { createMessage } from '../services/message.service'; 
import "./MessageModal.css"

export const MessageModal = ({ recipient, onClose }) => {
    const { user } = useAuth();
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleCreateMessage = async (event) => {
        event.preventDefault();

        if (!user) {
            setError('User not found. Please login.');
            return;
        }

        setLoading(true); // Start loading

        try {
            const response = await createMessage(recipient._id, content);
            console.log('Message created:', response);

            if (response.status === 200) {
                console.log('Response status is 200');
                setError(null); // Clear any previous error
                setContent(''); // Clear the message content
                onClose(); // Close the modal only if the message was created successfully
            } else {
                console.log('Response status is not 200:', response.status);
                setError('Failed to send message.');
            }
        } catch (err) {
            console.error('Error creating message:', err); // Log the full error for debugging
            if (err.response && err.response.data && err.response.data.error) {
                setError(err.response.data.error);
            } else {
                setError('Failed to send message.');
            }
        } finally {
            setLoading(false); // End loading
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Envía un mensaje a {recipient.name}</h2>
                <form onSubmit={handleCreateMessage}>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        disabled={loading}
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Enviando...' : 'Enviar'}
                    </button>
                </form>
                {error && <p className="error-message">{error}</p>}
                <button onClick={onClose} disabled={loading}>Cerrar</button>
            </div>
        </div>
    );
};