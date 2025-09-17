"use client";

import React from 'react';
import { MapPin, Target } from 'lucide-react';
import { useCricket } from '../hooks/useCricket';

const ScoreDisplay = () => {
  const { state } = useCricket();
  const currentInnings = state.currentInnings === 1 ? state.innings1 : state.innings2;
  const { score, battingTeam, bowlingTeam } = currentInnings;
  const isInnings2 = state.currentInnings === 2;
  
  const getOversDisplay = () => {
    if (score.balls === 0) {
      return score.overs;
    }
    return `${score.overs}.${score.balls}`;
  };

  const getRequiredRunRate = () => {
    if (!isInnings2) return null;
    const target = state.innings2.target;
    const required = target - score.runs;
    const remainingBalls = (state.matchSetup.totalOvers * 6) - (score.overs * 6 + score.balls);
    const remainingOvers = remainingBalls / 6;
    if (remainingOvers <= 0) return null;
    return (required / remainingOvers).toFixed(2);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="text-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {battingTeam} vs {bowlingTeam}
          </h2>
          <p className="text-sm text-gray-600">
            {state.currentInnings === 1 ? 'First' : 'Second'} Innings
          </p>
          {state.matchSetup.venue && (
            <p className="text-sm text-gray-600 flex items-center justify-center">
              <MapPin className="w-4 h-4 mr-1" />
              {state.matchSetup.venue}
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600 font-mono">
              {score.runs}
            </div>
            <div className="text-sm text-gray-600">Runs</div>
          </div>
          
          <div>
            <div className="text-3xl font-bold text-red-600 font-mono">
              {score.wickets}
            </div>
            <div className="text-sm text-gray-600">Wickets</div>
          </div>
          
          <div>
            <div className="text-3xl font-bold text-green-600 font-mono">
              {getOversDisplay()}
            </div>
            <div className="text-sm text-gray-600">Overs</div>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <div className="text-2xl font-bold text-gray-800">
            {score.runs}/{score.wickets} ({getOversDisplay()})
          </div>
        </div>

        {isInnings2 && (
          <div className="mt-4 bg-red-50 p-3 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="text-center flex-1">
                <div className="text-lg font-bold text-red-600">
                  {state.innings2.target}
                </div>
                <div className="text-xs text-red-600">Target</div>
              </div>
              <div className="text-center flex-1">
                <div className="text-lg font-bold text-orange-600">
                  {state.innings2.target - score.runs}
                </div>
                <div className="text-xs text-orange-600">Required</div>
              </div>
              <div className="text-center flex-1">
                <div className="text-lg font-bold text-purple-600">
                  {getRequiredRunRate() || 'N/A'}
                </div>
                <div className="text-xs text-purple-600">RRR</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {isInnings2 && (
        <div className="bg-gray-50 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">First Innings</h3>
          <div className="text-center">
            <span className="text-lg font-bold text-gray-800">
              {state.innings1.battingTeam}: {state.innings1.score.runs}/{state.innings1.score.wickets}
            </span>
            <span className="text-sm text-gray-600 ml-2">
              ({state.innings1.score.overs}.{state.innings1.score.balls})
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScoreDisplay;

