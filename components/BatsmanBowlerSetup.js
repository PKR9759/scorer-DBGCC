"use client";

import React, { useState } from 'react';
import { Play, Target } from 'lucide-react';
import { useCricket } from '../hooks/useCricket';

const BatsmanBowlerSetup = () => {
  const { state, dispatch } = useCricket();
  const [batsman, setBatsman] = useState('');
  const [bowler, setBowler] = useState('');
  
  const currentInnings = state.currentInnings === 1 ? state.innings1 : state.innings2;
  const isInnings2 = state.currentInnings === 2;

  const handleSubmit = () => {
    if (batsman && bowler) {
      dispatch({
        type: 'SET_BATSMAN_BOWLER',
        payload: { batsman, bowler }
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Batsman ({currentInnings.battingTeam})
              </label>
              <input
                type="text"
                value={batsman}
                onChange={(e) => setBatsman(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter batsman name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Bowler ({currentInnings.bowlingTeam})
              </label>
              <input
                type="text"
                value={bowler}
                onChange={(e) => setBowler(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter bowler name"
              />
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

