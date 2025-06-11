// App.jsx
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import ChatBubble from './components/ChatBubble';
import ChatInput from './components/ChatInput';
import ThinkingIndicator from './components/ThinkingIndicator';
import PriceChart from './components/PriceChart';
import { PortfolioProvider } from './context/PortfolioContext';
import './styles/global.css';

const socket = io(process.env.REACT_APP_SERVER_URL || 'http://localhost:5000', {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

const App = () => {
  const [messages, setMessages] = useState([]);
  const [connectionError, setConnectionError] = useState(null);
  const messagesEndRef = useRef(null);
  const isSending = useRef(false);

  useEffect(() => {
    socket.on('message', (message) => {
      if (!message || typeof message !== 'object' || !message.text || !message.type) {
        console.error('Invalid server message:', JSON.stringify(message, null, 2));
        return;
      }

      console.log('Valid server message:', JSON.stringify(message, null, 2));
      setMessages((prev) => [...prev, { ...message, timestamp: new Date() }]);
      if (message.type === 'text' && message.text !== 'Thinking...') {
        const utterance = new SpeechSynthesisUtterance(message.text);
        utterance.onerror = (event) => console.error('Speech synthesis error:', event.error);
        window.speechSynthesis.speak(utterance);
      }
    });

    socket.on('connect', () => {
      console.log('Connected to server:', socket.id);
      setConnectionError(null);
    });

    socket.on('connect_error', (error) => {
      console.error('Connection error:', error.message);
      setConnectionError('Failed to connect to server. Retrying...');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
      setConnectionError('Disconnected from server.');
    });

    return () => {
      socket.off('message');
      socket.off('connect');
      socket.off('connect_error');
      socket.off('disconnect');
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text) => {
    if (text.trim() && !isSending.current) {
      isSending.current = true;
      console.log('Sending message:', text);
      const userMessage = { text, isUser: true, type: 'text', timestamp: new Date() };
      socket.emit('message', { text });
      setMessages((prev) => [...prev.filter((m) => m.text !== text || !m.isUser), userMessage]);
      setTimeout(() => { isSending.current = false; }, 1000); // Increased debounce
    } else {
      console.warn('Blocked duplicate or empty message:', text);
    }
  };

  return (
    <PortfolioProvider>
      <div className="flex flex-col h-screen bg-gray-100">
        {connectionError && (
          <div className="bg-red-500 text-white text-center p-2">{connectionError}</div>
        )}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((msg, index) => (
            <div key={`msg-${index}`}>
              <ChatBubble message={msg} />
              {msg.type === 'chart' && msg.data && <PriceChart data={msg.data} />}
            </div>
          ))}
          {messages[messages.length - 1]?.text === 'Thinking...' && <ThinkingIndicator />}
          <div ref={messagesEndRef} />
        </div>
        <ChatInput onSend={sendMessage} />
      </div>
    </PortfolioProvider>
  );
};

export default App;