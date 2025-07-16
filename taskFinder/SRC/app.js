import React, { useState } from 'react';
import LoginPage from './LoginPage';
import WelcomePage from './WelcomePage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {isLoggedIn ? (
        <WelcomePage />
      ) : (
        <LoginPage onLogin={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
}

export default App;
