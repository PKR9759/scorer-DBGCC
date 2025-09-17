"use client";

import React, { useState } from 'react';
import { useCricket } from '../hooks/useCricket';

const NewBowlerInput = () => {
  const { state, dispatch } = useCricket();
  const [newBowler, setNewBowler] = useState('');
  
  const currentInnings = state.currentInnings === 1 ? state.innings1 : state.innings2;

  const handleSubmit = () => {
    if (newBowler.trim()) {
      dispatch({
        type: 'SET_NEW_BOWLER',
        payload: newBowler.trim()
      });
      setNewBowler('');
    }
  };

  return (
    <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-4">
      <h3 className="text-lg font-semibold text-blue-800 mb-3 text-center">
        Over Complete! New Bowler Required
      </h3>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-blue-700 mb-1">
            New Bowler ({currentInnings.bowlingTeam})
          </label>
          <input
            type="text"
            value={newBowler}
            onChange={(e) => setNewBowler(e.target.value)}
            className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter new bowler name"
            autoFocus
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={!newBowler.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Continue with New Bowler
        </button>
      </div>
    </div>
  );
};

export default NewBowlerInput;

