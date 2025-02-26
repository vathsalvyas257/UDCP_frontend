import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  // to capture the room from the URL
import io from 'socket.io-client';

const socket = io('http://localhost:7777'); // Your backend URL

const ChatRoom = () => {
  const { room } = useParams();  // Capture room name from URL
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState('User');  // This can come from authentication context or localStorage

  // Join the room and listen for messages
  useEffect(() => {
    socket.emit('joinRoom', room);

    // Listen for previous messages
    socket.on('previousMessages', (messages) => {
      setMessages(messages);
    });

    // Listen for new messages in real-time
    socket.on('newMessage', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off('previousMessages');
      socket.off('newMessage');
    };
  }, [room]);

  // Send a message to the backend
  const sendMessage = () => {
    socket.emit('sendMessage', { room, message, user });
    setMessage('');
  };

  return (
    <div className="chatroom h-screen flex flex-col jusitfy-center items-center p-[10vh]">
      <h2>{room} Chatroom</h2>
      <div className="messages">
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
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatRoom;
