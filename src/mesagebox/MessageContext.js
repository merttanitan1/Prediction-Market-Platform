import React, { createContext, useState, useContext } from 'react';

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [fadeOut, setFadeOut] = useState([]);

  const addMessage = (type, text, duration = 10000) => {
    const id = Date.now();
    setMessages([...messages, { id, type, text, duration }]);
    if (duration > 0) {
      setTimeout(() => {
        setFadeOut(prev => [...prev, id]);
        setTimeout(() => {
          setMessages(messages => messages.filter(message => message.id !== id));
          setFadeOut(prev => prev.filter(fadeId => fadeId !== id));
        }, 1000); 
      }, duration - 500); 
    }
  };

  const removeMessage = (id) => {
    setFadeOut(prev => [...prev, id]);
    setTimeout(() => {
      setMessages(messages => messages.filter(message => message.id !== id));
      setFadeOut(prev => prev.filter(fadeId => fadeId !== id));
    }, 1000); 
  };

  return (
    <MessageContext.Provider value={{ messages, addMessage, removeMessage, fadeOut }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => useContext(MessageContext);
