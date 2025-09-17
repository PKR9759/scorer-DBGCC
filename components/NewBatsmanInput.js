"use client";

import React, { useState } from 'react';
import { useCricket } from '../hooks/useCricket';

const NewBatsmanInput = () => {
  const { state, dispatch } = useCricket();
  const [newBatsman, setNewBatsman] = useState('');
  
  const currentInnings = state.currentInnings === 1 ? state.innings1 : state.innings2;
  const battingTeamPlayers = state.currentInnings === 1 ? state.matchSetup.playersTeamA : state.matchSetup.playersTeamB;
  const isLastWicket = currentInnings.score.wickets >= (battingTeamPlayers - 1);

  const handleSubmit = () => {
    if (newBatsman.trim()) {
      dispatch({
        type: 'SET_NEW_BATSMAN',
        payload: newBatsman.trim()
      });
      setNewBatsman('');
    }
  };

  return (
    <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-4">
      <h3 className="text-lg font-semibold text-red-800 mb-3 text-center">
        Wicket! New Batsman Required
      </h3>
      {isLastWicket && (
        <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-2 mb-3">
          <p className="text-yellow-800 text-sm text-center font-medium">
            ⚠️ Last wicket! Next wicket will end the innings.
          </p>
        </div>
      )}
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-red-700 mb-1">
            New Batsman ({currentInnings.battingTeam})
          </label>
          <input
            type="text"
            value={newBatsman}
            onChange={(e) => setNewBatsman(e.target.value)}
            className="w-full px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Enter new batsman name"
            autoFocus
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={!newBatsman.trim()}
          className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Continue with New Batsman
        </button>
      </div>
    </div>
  );
};

export default NewBatsmanInput;
