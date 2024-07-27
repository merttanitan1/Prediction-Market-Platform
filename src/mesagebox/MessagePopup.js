import React from 'react';
import { useMessage } from './MessageContext';
import './MessagePopup.css';

const MessagePopup = () => {
  const { messages, removeMessage, fadeOut } = useMessage();

  return (
    <div className="message-container">
      {messages.map(message => (
        <div
          key={message.id}
          className={`message-popup ${message.type} ${fadeOut.includes(message.id) ? 'fade-out' : ''}`}
        >
          <p dangerouslySetInnerHTML={{ __html: message.text }} />
          <div className="close-btn" onClick={() => removeMessage(message.id)}>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='inherit' width='10px'>
              <path d='M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z'/>
            </svg>
          </div>
          {message.duration > 0 && <div className="progress-bar" style={{ animationDuration: `${message.duration}ms` }}></div>}
        </div>
      ))}
    </div>
  );
};

export default MessagePopup;