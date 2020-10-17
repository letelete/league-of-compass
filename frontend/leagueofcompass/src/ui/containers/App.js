import GameBackground from '../components/GameBackground';
import LoginPage from '../pages/LoginPage';
import React from 'react';

const App = () => {
  return (
    <div className="app">
      <GameBackground>
        <LoginPage />
      </GameBackground>
    </div>
  );
};

export default App;
