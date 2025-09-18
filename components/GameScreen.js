"use client";

import React from 'react';
import { RotateCcw, Trophy, Undo2, ListOrdered } from 'lucide-react';
import { useCricket } from '../hooks/useCricket';
import BatsmanBowlerSetup from './BatsmanBowlerSetup';
import ScoreDisplay from './ScoreDisplay';
import PlayerInfo from './PlayerInfo';
import BallInput from './BallInput';
import Commentary from './Commentary';
import NewBatsmanInput from './NewBatsmanInput';
import NewBowlerInput from './NewBowlerInput';

const GameScreen = () => {
  const { state, dispatch } = useCricket();
  const currentInnings = state.currentInnings === 1 ? state.innings1 : state.innings2;

  const handleUndo = () => {
    dispatch({ type: 'UNDO' });
  };

  const handleViewScorecard = () => {
    dispatch({ type: 'VIEW_SCORECARD' });
  };

  // Check if we need batsman/bowler setup
  if (!currentInnings.currentBatsman || !currentInnings.currentBowler) {
    return <BatsmanBowlerSetup />;
  }

  // Check if we need new batsman after wicket
  if (state.needsNewBatsman) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="max-w-md mx-auto">
          <div className="mb-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900">
              {state.currentInnings === 1 ? 'First' : 'Second'} Innings
            </h1>
            <div className="flex space-x-2">
              <button
                onClick={handleViewScorecard}
                className="p-2 bg-blue-300 hover:bg-blue-500 rounded-lg transition-colors"
              >
                <ListOrdered className="w-5 h-5" />
              </button>
              <button
                onClick={handleUndo}
                disabled={state.history.length === 0}
                className="p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                <Undo2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          <ScoreDisplay />
          <NewBatsmanInput />
        </div>
      </div>
    );
  }

  // Check if we need new bowler after over
  if (state.needsNewBowler) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="max-w-md mx-auto">
          <div className="mb-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900">
              {state.currentInnings === 1 ? 'First' : 'Second'} Innings
            </h1>
            <div className="flex space-x-2">
              <button
                onClick={handleViewScorecard}
                className="p-2 bg-blue-300 hover:bg-blue-500 rounded-lg transition-colors"
              >
                <ListOrdered className="w-5 h-5" />
              </button>
              <button
                onClick={handleUndo}
                disabled={state.history.length === 0}
                className="p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                <Undo2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          <ScoreDisplay />
          <NewBowlerInput />
        </div>
      </div>
    );
  }

  if (state.gameState === 'finished') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Match Complete!</h1>

            <div className="space-y-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800">First Innings</h3>
                <div className="text-xl font-bold text-blue-600">
                  {state.innings1.battingTeam}: {state.innings1.score.runs}/{state.innings1.score.wickets}
                </div>
                <div className="text-sm text-blue-600">
                  ({state.innings1.score.overs}.{state.innings1.score.balls} overs)
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800">Second Innings</h3>
                <div className="text-xl font-bold text-green-600">
                  {state.innings2.battingTeam}: {state.innings2.score.runs}/{state.innings2.score.wickets}
                </div>
                <div className="text-sm text-green-600">
                  ({state.innings2.score.overs}.{state.innings2.score.balls} overs)
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg mb-6">
              <h2 className="text-xl font-bold text-yellow-800 mb-2">
                {state.winner.team === 'Tie' ? 'Match Tied!' : `${state.winner.team} Wins!`}
              </h2>
              <p className="text-yellow-700">
                {state.winner.margin}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">
            {state.currentInnings === 1 ? 'First' : 'Second'} Innings
          </h1>
          <div className="flex space-x-2">
            {/* THIS IS THE MISSING BUTTON */}
            <button
              onClick={handleViewScorecard}
              className="p-2 bg-blue-300 hover:bg-blue-500 rounded-lg transition-colors"
            >
              <ListOrdered className="w-5 h-5" />
            </button>
            <button
              onClick={handleUndo}
              disabled={state.history.length === 0}
              className="p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              <Undo2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <ScoreDisplay />

        <PlayerInfo />

        <BallInput />

        <Commentary />
      </div>
    </div>
  );
};

export default GameScreen;