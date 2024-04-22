import React from 'react';
import './message.css';

const MessageList = ({ messages }) => {
    if (!Array.isArray(messages)) {
        return <div className="message-list">No messages</div>;
    }
  return (
    <div className="message-list">
        <ul>
            {messages.map((message, index) => (
            <li key={index}>
                <div>
                <strong>{message.senderId}</strong>
                <p>{message.text}</p>
                </div>
            </li>
            ))}
        </ul>
    </div>
  );
};

export default MessageList;