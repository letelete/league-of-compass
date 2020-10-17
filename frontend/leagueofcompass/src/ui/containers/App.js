import AppGrid from '../components/AppGrid';
import GameBackground from '../components/GameBackground';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  return (
    <main className="app">
      <Router>
        <GameBackground>
          <AppGrid />
        </GameBackground>
      </Router>
    </main>
  );
};

export default App;
