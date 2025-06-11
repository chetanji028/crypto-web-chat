// components/ChatBubble.jsx
import React from 'react';
import '../styles/ChatBubble.css';

const ChatBubble = ({ message }) => {
  // Validate message prop
  if (!message || typeof message !== 'object' || !message.text) {
    console.error('Invalid message in ChatBubble:', message);
    return null; // Skip rendering
  }

  const { text, isUser, timestamp } = message;
  const time = timestamp ? new Date(timestamp).toLocaleTimeString() : '';

  return (
    <div className={`chat-bubble ${isUser ? 'user' : 'bot'}`}>
      <div className="bubble-content">
        <p>{text}</p>
        <span className="timestamp">{time}</span>
      </div>
    </div>
  );
};

export default ChatBubble;