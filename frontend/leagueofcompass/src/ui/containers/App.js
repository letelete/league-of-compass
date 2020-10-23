import AppContent from '../components/AppContent';
import AppGrid from '../components/AppGrid';
import AppNavbar from '../components/AppNavbar';
import GameBackground from '../components/GameBackground';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  return (
    <main className="app">
      <Router>
        <GameBackground>
          <AppGrid navigation={<AppNavbar />} content={<AppContent />} />
        </GameBackground>
      </Router>
    </main>
  );
};

export default App;
