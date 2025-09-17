"use client";

import React from 'react';
import { CricketProvider } from '../context/CricketContext';
import MatchSetup from './MatchSetup';
import GameScreen from './GameScreen';
import { useCricket } from '../hooks/useCricket';

const CricketMain = () => {
  const { state } = useCricket();

  if (state.gameState === 'setup') {
    return <MatchSetup />;
  }

  return <GameScreen />;
};

const CricketApp = () => {
  return (
    <CricketProvider>
      <CricketMain />
    </CricketProvider>
  );
};

export default CricketApp;
