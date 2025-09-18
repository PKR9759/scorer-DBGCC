// File: components/BatsmanBowlerSetup.js

"use client";

import React, { useState } from 'react';
import { Play, Target } from 'lucide-react';
import { useCricket } from '../hooks/useCricket';

const BatsmanBowlerSetup = () => {
  const { state, dispatch } = useCricket();
  
  // State for batsman
  const [batsman, setBatsman] = useState('');
  const [isCustomBatsman, setIsCustomBatsman] = useState(false);

  // State for bowler
  const [bowler, setBowler] = useState('');
  const [isCustomBowler, setIsCustomBowler] = useState(false);
  
  const currentInnings = state.currentInnings === 1 ? state.innings1 : state.innings2;
  const isInnings2 = state.currentInnings === 2;

  // Get the correct player lists from the context state
  const battingTeamPlayers = currentInnings.battingTeam === state.matchSetup.teamA 
    ? state.matchSetup.playersListA 
    : state.matchSetup.playersListB;

  const bowlingTeamPlayers = currentInnings.bowlingTeam === state.matchSetup.teamA 
    ? state.matchSetup.playersListA 
    : state.matchSetup.playersListB;

  const handleBatsmanChange = (e) => {
    const value = e.target.value;
    if (value === 'other') {
      setIsCustomBatsman(true);
      setBatsman(''); // Clear the selected name
    } else {
      setIsCustomBatsman(false);
      setBatsman(value); // Set the selected name from the list
    }
  };

  const handleBowlerChange = (e) => {
    const value = e.target.value;
    if (value === 'other') {
      setIsCustomBowler(true);
      setBowler(''); // Clear the selected name
    } else {
      setIsCustomBowler(false);
      setBowler(value); // Set the selected name from the list
    }
  };

  const handleSubmit = () => {
    // Determine the final names to be used
    const finalBatsman = isCustomBatsman ? batsman : batsman;
    const finalBowler = isCustomBowler ? bowler : bowler;

    if (finalBatsman && finalBowler) {
      dispatch({
        type: 'SET_BATSMAN_BOWLER',
        payload: { batsman: finalBatsman, bowler: finalBowler }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {isInnings2 ? 'Second' : 'First'} Innings
            </h1>
            <div className="bg-blue-50 p-3 rounded-lg mb-4">
              <p className="text-sm text-blue-800">
                <strong>{currentInnings.battingTeam}</strong> batting
              </p>
              <p className="text-sm text-blue-600">
                vs <strong>{currentInnings.bowlingTeam}</strong>
              </p>
              {isInnings2 && (
                <div className="mt-2 flex items-center justify-center">
                  <Target className="w-4 h-4 mr-1 text-red-600" />
                  <span className="text-red-600 font-semibold">
                    Target: {state.innings2.target}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {/* Batsman Dropdown/Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Batsman ({currentInnings.battingTeam})
              </label>
              <select
                value={isCustomBatsman ? 'other' : batsman}
                onChange={handleBatsmanChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="" disabled>Select or enter a name</option>
                {battingTeamPlayers.map(player => (
                  <option key={player} value={player}>
                    {player}
                  </option>
                ))}
                <option value="other">Other (Enter name)</option>
              </select>
              {isCustomBatsman && (
                <input
                  type="text"
                  value={batsman}
                  onChange={(e) => setBatsman(e.target.value)}
                  className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter batsman name"
                  autoFocus
                />
              )}
            </div>

            {/* Bowler Dropdown/Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Bowler ({currentInnings.bowlingTeam})
              </label>
              <select
                value={isCustomBowler ? 'other' : bowler}
                onChange={handleBowlerChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="" disabled>Select or enter a name</option>
                {bowlingTeamPlayers.map(player => (
                  <option key={player} value={player}>
                    {player}
                  </option>
                ))}
                <option value="other">Other (Enter name)</option>
              </select>
              {isCustomBowler && (
                <input
                  type="text"
                  value={bowler}
                  onChange={(e) => setBowler(e.target.value)}
                  className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter bowler name"
                  autoFocus
                />
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={!batsman || !bowler}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
            >
              <Play className="w-5 h-5 mr-2" />
              Start {isInnings2 ? 'Second' : 'First'} Innings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatsmanBowlerSetup;