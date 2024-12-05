import React, { useEffect, useState } from 'react';
import { getMessages } from '../api/service';
import socket from '../util/socket';


const ChatInterface = ({ businessId, investorId, type, title }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        // Join chat room
        socket.getSocket().emit('joinChat', { businessId, investorId });

        // Listen for incoming messages
        socket.getSocket().on('receiveMessage', (message) => {
            setMessages((prev) => [...prev, message]);
        });

        fetchMessages();

        return () => {
        };
    }, [businessId, investorId]);

    const fetchMessages = async () => {
        try {
            setFetching(true)
            const res = await getMessages(businessId, investorId);
            setMessages(res.data.events);
            setFetching(false)
        } catch (error) {
            setFetching(false)
            console.error(error);
        }
    }

    const sendMessage = () => {
        if (newMessage.trim()) {
            const message = { senderType: type, message: newMessage }; // Replace with dynamic sender
            socket.getSocket().emit('sendMessage', {
                message: newMessage,
                businessId,
                sender: type,
                investorId,
            });
            setMessages((prev) => [...prev, message]);
            setNewMessage('');
        }
    };

    return (
        <div className="p-6">
            <h3 className="text-xl font-bold text-blue-700 mb-2">
                {title} ({type !== 'business' ? 'Business' : 'Investor'})
            </h3>
            <div className="messages bg-gray-100 p-4 h-80 overflow-y-auto">
                {fetching && <div className="flex justify-center items-center">
                    <div className="w-8 h-8 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
                </div>}
                {!fetching && messages.map((msg, index) => (
                    <div key={index} className="mb-2">
                        <strong>{msg.senderType}:</strong> {msg.message}
                    </div>
                ))}
                {!fetching && messages.length === 0 && <div>No messages yet</div>}
            </div>
            <div className="mt-4 flex">
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 p-2 border rounded"
                />
                <button onClick={sendMessage} className="ml-2 bg-blue-500 text-white py-2 px-4 rounded">
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatInterface;
