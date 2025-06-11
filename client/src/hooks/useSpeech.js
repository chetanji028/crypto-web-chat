 
import { useState } from 'react';

export const useSpeech = (onResult) => {
  const [isListening, setIsListening] = useState(false);
  const recognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!recognition) {
    console.warn('SpeechRecognition API not supported in this browser.');
    return { isListening: false, startListening: () => alert('Speech input not supported.') };
  }

  const speech = new recognition();
  speech.continuous = false;
  speech.interimResults = false;

  speech.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    onResult(transcript);
    setIsListening(false);
  };

  speech.onerror = () => setIsListening(false);

  const startListening = () => {
    setIsListening(true);
    speech.start();
  };

  return { isListening, startListening };
};