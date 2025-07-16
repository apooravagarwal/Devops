import React, { useState } from 'react';

function WelcomePage() {
  const [searchText, setSearchText] = useState('');
  const [result, setResult] = useState('');

  const handleSearch = () => {
    // Example action with the search text
    setResult(`Searching for: ${searchText}`);
  };

  return (
    <div>
      <h2>Welcome!</h2>
      <input
        type="text"
        placeholder="Enter your query"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <p>{result}</p>
    </div>
  );
}

export default WelcomePage;
