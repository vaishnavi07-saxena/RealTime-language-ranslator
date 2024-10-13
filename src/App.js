import React, { useState, useEffect } from 'react';
import './App.css'; // Import the CSS file

import { w3cwebsocket as W3CWebSocket } from 'websocket';

const client = new W3CWebSocket('ws://localhost:3001'); // Connect to your WebSocket server

function App() {
  const [text, setText] = useState('');
  const [targetLang, setTargetLang] = useState('es'); // Default to Spanish
  const [translation, setTranslation] = useState('');

  useEffect(() => {
    client.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (data.error) {
        setTranslation(data.error); // Display error message from server
      } else {
        setTranslation(data.translatedText || 'Translation failed');
      }
    };
  }, []);

  const handleTranslate = () => {
    if (text.trim() === '') {
      alert('Please enter text to translate'); // Alert for empty input
      return;
    }
    client.send(JSON.stringify({ text, targetLang }));
  };

  return (
    <div className="App">
      <h1>Real-time Language Translator</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to translate"
      />
      <select onChange={(e) => setTargetLang(e.target.value)}>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="it">Italian</option>
        <option value="pt">Portuguese</option>
        <option value="zh">Chinese</option>
        <option value="ja">Japanese</option>
        <option value="ru">Russian</option>
        <option value="ar">Arabic</option>
        {/* Add more language options as needed */}
      </select>
      <button onClick={handleTranslate}>Translate</button>
      <p>Translation: {translation}</p>
    </div>
  );
}

export default App;
