import GameBackground from '../components/GameBackground';
import LoginPage from '../pages/LoginPage';
import LogoutPage from '../pages/LogoutPage';
import React from 'react';

const App = () => {
  return (
    <div className="app">
      <GameBackground>
        <LogoutPage />
      </GameBackground>
    </div>
  );
};

export default App;
