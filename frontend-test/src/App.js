import React, { useState } from 'react';

function App() {
  const [originalUrl, setoriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalUrl }),
      });
      const data = await response.json();
      setShortenedUrl(data.shortUrl);
      console.log('Shortened URL:', data.shortUrl);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Estilos inline para o container, input, botão e resultado
  const containerStyle = {
    maxWidth: '400px',
    margin: '60px auto',
    padding: '32px',
    background: '#f9f9f9',
    borderRadius: '12px',
    boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif'
  };

  const inputStyle = {
    width: '80%',
    padding: '10px',
    margin: '12px 0',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px'
  };

  const buttonStyle = {
    padding: '10px 24px',
    borderRadius: '6px',
    border: 'none',
    background: '#007bff',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '8px'
  };

  const urlStyle = {
    marginTop: '24px',
    padding: '12px',
    background: '#e6ffe6',
    borderRadius: '6px',
    wordBreak: 'break-all'
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ color: '#007bff' }}>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={originalUrl}
          onChange={(e) => setoriginalUrl(e.target.value)}
          placeholder="Digite a URL para encurtar"
          required
          style={inputStyle}
        />
        <br />
        <button type="submit" style={buttonStyle}>Encurtar</button>
      </form>
      {shortenedUrl && (
        <div style={urlStyle}>
          <h2 style={{ color: '#28a745', margin: 0 }}>URL Encurtada:</h2>
          <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">{shortenedUrl}</a>
        </div>
      )}
    </div>
  );
}

export default App;