 
import React, { useState } from 'react';
import { useSpeech } from '../hooks/useSpeech';
import '../styles/ChatInput.css';

const ChatInput = ({ onSend }) => {
  const [input, setInput] = useState('');
  const { startListening, isListening } = useSpeech((transcript) => {
    setInput(transcript);
    onSend(transcript);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="chat-input">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask about crypto..."
        className="input-field"
      />
      <button type="button" onClick={startListening} className="mic-button">
        {isListening ? '🎙️ Listening...' : '🎙️'}
      </button>
      <button type="submit" className="send-button">Send</button>
    </form>
  );
};

export default ChatInput;