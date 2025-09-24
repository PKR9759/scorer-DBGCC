// File: components/CricketMain.js

"use client";

import React from 'react';
import { CricketProvider } from '../context/CricketContext';
import MatchSetup from './MatchSetup';
import GameScreen from './GameScreen';
import Scorecard from './Scorecard';
import { useCricket } from '../hooks/useCricket';
import SettingsForm from './SettingsForm'; // Import the new SettingsForm component

const CricketMain = () => {
    const { state } = useCricket();

    if (state.gameState === 'setup') {
        return <MatchSetup />;
    }

    if (state.gameState === 'scorecard') {
        return <Scorecard />;
    }

    if (state.gameState === 'settings') {
        return <SettingsForm />;
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