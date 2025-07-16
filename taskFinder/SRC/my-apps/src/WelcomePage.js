import React, { useState } from 'react';

function WelcomePage() {
  const [searchText, setSearchText] = useState('');
  const [result, setResult] = useState('');

  const handleSearch = () => {
    setResult(`Searching for: ${searchText}`);
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
  };

  const inputStyle = {
    margin: '10px',
    padding: '8px',
    width: '250px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    margin: '10px',
  };

  const headingStyle = {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '20px',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Welcome!</h2>
      <input
        type="text"
        placeholder="Enter your query"
        style={inputStyle}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button onClick={handleSearch} style={buttonStyle}>Search</button>
      <p>{result}</p>
    </div>
  );
}

export default WelcomePage;
