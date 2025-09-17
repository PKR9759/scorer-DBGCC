"use client";

import React, { useState } from 'react';
import { Play, Trophy, Clock, MapPin, Users } from 'lucide-react';
import { useCricket } from '../hooks/useCricket';

const MatchSetup = () => {
  const { dispatch } = useCricket();
  const [setup, setSetup] = useState({
    teamA: '',
    teamB: '',
    battingFirst: '',
    venue: '',
    totalOvers: 20,
    playersTeamA: 11,
    playersTeamB: 11
  });
  const [errors, setErrors] = useState({});

  const clearError = (field) => {
    if (errors[field]) {
      setErrors({...errors, [field]: ''});
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    // Use `parseInt` with fallbacks here, when the form is submitted
    const overs = parseInt(setup.totalOvers);
    const playersA = parseInt(setup.playersTeamA);
    const playersB = parseInt(setup.playersTeamB);
    
    // Validation
    if (!setup.teamA) newErrors.teamA = 'Team A name is required';
    if (!setup.teamB) newErrors.teamB = 'Team B name is required';
    if (!setup.battingFirst) newErrors.battingFirst = 'Please select batting team';
    
    if (isNaN(overs) || overs < 1 || overs > 50) {
      newErrors.totalOvers = 'Total overs must be between 1 and 50';
    }
    
    if (isNaN(playersA) || playersA < 2 || playersA > 20) {
      newErrors.playersTeamA = 'Team A players must be between 2 and 20';
    }
    
    if (isNaN(playersB) || playersB < 2 || playersB > 20) {
      newErrors.playersTeamB = 'Team B players must be between 2 and 20';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      dispatch({
        type: 'SETUP_MATCH',
        payload: {
          ...setup,
          totalOvers: overs,
          playersTeamA: playersA,
          playersTeamB: playersB,
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Cricket Scorekeeper</h1>
            <p className="text-gray-600">Set up your match to begin</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Team A
              </label>
              <input
                type="text"
                name="teamA"
                value={setup.teamA}
                onChange={(e) => {
                  setSetup({...setup, teamA: e.target.value});
                  clearError('teamA');
                }}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.teamA ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter Team A name"
              />
              {errors.teamA && <p className="text-red-500 text-xs mt-1">{errors.teamA}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Team B
              </label>
              <input
                type="text"
                name="teamB"
                value={setup.teamB}
                onChange={(e) => {
                  setSetup({...setup, teamB: e.target.value});
                  clearError('teamB');
                }}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.teamB ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter Team B name"
              />
              {errors.teamB && <p className="text-red-500 text-xs mt-1">{errors.teamB}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Batting First
              </label>
              <select
                name="battingFirst"
                value={setup.battingFirst}
                onChange={(e) => {
                  setSetup({...setup, battingFirst: e.target.value});
                  clearError('battingFirst');
                }}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.battingFirst ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select batting team</option>
                {setup.teamA && <option value={setup.teamA}>{setup.teamA}</option>}
                {setup.teamB && <option value={setup.teamB}>{setup.teamB}</option>}
              </select>
              {errors.battingFirst && <p className="text-red-500 text-xs mt-1">{errors.battingFirst}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Clock className="w-4 h-4 inline mr-1" />
                Total Overs
              </label>
              <input
                type="number"
                name="totalOvers"
                min="1"
                max="50"
                value={setup.totalOvers}
                onChange={(e) => {
                  setSetup({...setup, totalOvers: e.target.value});
                  clearError('totalOvers');
                }}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.totalOvers ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="20"
              />
              <p className="text-xs text-gray-500 mt-1">1-50 overs</p>
              {errors.totalOvers && <p className="text-red-500 text-xs mt-1">{errors.totalOvers}</p>}
            </div>

            <div className="mt-2 mb-2">
              <p className="text-sm text-gray-600 text-center">
                💡 Teams can have different numbers of players
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Users className="w-4 h-4 inline mr-1" />
                  {setup.teamA || 'Team A'} Players
                </label>
                <input
                  type="number"
                  name="playersTeamA"
                  min="2"
                  max="20"
                  value={setup.playersTeamA}
                  onChange={(e) => {
                    setSetup({...setup, playersTeamA: e.target.value});
                    clearError('playersTeamA');
                  }}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.playersTeamA ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="11"
                />
                <p className="text-xs text-gray-500 mt-1">2-20 players</p>
                {errors.playersTeamA && <p className="text-red-500 text-xs mt-1">{errors.playersTeamA}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Users className="w-4 h-4 inline mr-1" />
                  {setup.teamB || 'Team B'} Players
                </label>
                <input
                  type="number"
                  name="playersTeamB"
                  min="2"
                  max="20"
                  value={setup.playersTeamB}
                  onChange={(e) => {
                    setSetup({...setup, playersTeamB: e.target.value});
                    clearError('playersTeamB');
                  }}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.playersTeamB ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="11"
                />
                <p className="text-xs text-gray-500 mt-1">2-20 players</p>
                {errors.playersTeamB && <p className="text-red-500 text-xs mt-1">{errors.playersTeamB}</p>}
              </div>
            </div>

            {/* Quick Format Presets */}
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Quick Format Presets:</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSetup({...setup, totalOvers: 20, playersTeamA: 11, playersTeamB: 11})}
                  className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 py-2 px-3 rounded-lg transition-colors"
                >
                  T20 (20 overs, 11 players)
                </button>
                <button
                  type="button"
                  onClick={() => setSetup({...setup, totalOvers: 50, playersTeamA: 11, playersTeamB: 11})}
                  className="text-xs bg-green-100 hover:bg-green-200 text-green-800 py-2 px-3 rounded-lg transition-colors"
                >
                  ODI (50 overs, 11 players)
                </button>
                <button
                  type="button"
                  onClick={() => setSetup({...setup, totalOvers: 10, playersTeamA: 6, playersTeamB: 6})}
                  className="text-xs bg-purple-100 hover:bg-purple-200 text-purple-800 py-2 px-3 rounded-lg transition-colors"
                >
                  T10 (10 overs, 6 players)
                </button>
                <button
                  type="button"
                  onClick={() => setSetup({...setup, totalOvers: 5, playersTeamA: 8, playersTeamB: 8})}
                  className="text-xs bg-orange-100 hover:bg-orange-200 text-orange-800 py-2 px-3 rounded-lg transition-colors"
                >
                  Quick (5 overs, 8 players)
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <MapPin className="w-4 h-4 inline mr-1" />
                Venue
              </label>
              <input
                type="text"
                name="venue"
                value={setup.venue}
                onChange={(e) => setSetup({...setup, venue: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Match venue (optional)"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Match
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MatchSetup;