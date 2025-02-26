// ChatRoom.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:7777'); // Backend server URL

const ChatRoom = ({ room }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState('');  // Ideally, user info will come from JWT or auth context

  // Join the room when component mounts
  useEffect(() => {
    socket.emit('joinRoom', room);

    // Listen for incoming messages
    socket.on('newMessage', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off('newMessage');
    };
  }, [room]);

  // Send a message to the backend
  const sendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('sendMessage', { room, message, user });
      setMessage(''); // Clear the message input field
    }
  };

  return (
    <div className='h-screen p-[0vh] flex flex-col justify-center items-center'>
      <h2 className='mt-10'>{room} Chatroom</h2>
      <div>
        {messages.map((msg, idx) => (
          <div key={idx}>
            <strong>{msg.user}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="border p-2"
      />
      <button onClick={sendMessage} className="bg-blue-500 text-white p-2 rounded mt-2">Send</button>
    </div>
  );
};

export default ChatRoom;
