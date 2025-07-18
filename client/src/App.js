import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const sendMessage = () => {
    socket.emit('send_message', { message });
    setChat([...chat, { message }]);
    setMessage('');
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setChat((prev) => [...prev, data]);
    });
  }, []);

  return (
    <div>
      <h2>Social Media Chat (Demo)</h2>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
      <div>
        {chat.map((c, i) => (
          <p key={i}>{c.message}</p>
        ))}
      </div>
    </div>
  );
}

export default App;